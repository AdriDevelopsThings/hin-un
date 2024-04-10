var loadedData = null
var dataLoading = false
// these functions will be run when the data is load
var loadedCallbacks = []

// get the loaded data
// if the data isn't available yet start the loading process or wait until loading is completed
const getData = async () => {
    if (loadedData) {
        return loadedData
    }
    if (dataLoading) {
        await Promise.new(resolve => {
            loadedCallbacks.push(resolve)
        })
    } else {
        await loadData()
        return await getData()
    }
}

// fetch the data and run all load callbacks
const loadData = async () => {
    dataLoading = true
    const response = await fetch('data.json')
    const json = await response.json()
    loadedData = json
    dataLoading = false
    loadedCallbacks.forEach(callback => callback())
    loadedCallbacks = []
    updateSources(loadedData.sources)
}

// interpret the hin (field hin), data should contain the current data
// this function will respond with a dictionary containing a set of digit meanings and the meaning of the combination
const interpretHin = (data, hin) => {
    const digitOutput = []
    for (const [index, hinDigit] of hin.split('').entries()) {
        const hinDigitData = data.hin.digits[hinDigit]
        if (!hinDigitData) {
            continue
        }
        if (typeof hinDigitData === 'string') {
            digitOutput.push(hinDigitData)
        } else if (typeof hinDigitData === 'object' && !Array.isArray(hinDigitData)) { // object but not an array
            if (hinDigitData.relevant) {
                digitOutput.push(hinDigitData.content)
            }
        } else if (typeof hinDigitData === 'object') { // hinDigitData is an array
            for (const eachHinDigitData of hinDigitData) {
                if (eachHinDigitData.digit_index.contains(index)) {
                    digitOutput.push(eachHinDigitData.content)
                }
            }
        }
    }
    const combinationMeaning = data.hin.combinations[hin]
    return {
        digits: new Set(digitOutput),
        combination: combinationMeaning
    }
}

// return the json object for this un (if exists)
const interpretUn = (data, un) => {
    return data.un[parseInt(un).toString()]
}

// html helper function
// remove all children of a html element
const removeAllChildren = (element) => {
    while (element.firstChild) {
        element.firstChild.remove()
    }
}

// put the hin data to the dom
const updateHin = (hinData) => {
    const container = document.getElementById('description-first-line')
    if (!hinData.digits && !hinData.combination) {
        container.style.display = 'none'
        return
    }
    container.style.display = 'block'

    const hinDigits = document.getElementById('hin-digits')
    const hinCombination = document.getElementById('hin-combination')

    if (hinData.digits) {
        hinDigits.style.display = 'block'
        const ul = hinDigits.getElementsByTagName('ul')[0]
        removeAllChildren(ul)
        for (const digitMeaning of hinData.digits) {
            const liElement = document.createElement('li')
            liElement.textContent = digitMeaning
            ul.appendChild(liElement)
        }
    } else {
        hinDigits.style.display = 'none'
    }

    if (hinData.combination) {
        hinCombination.style.display = 'block'
        const p = hinCombination.getElementsByTagName('span')[0]
        p.textContent = hinData.combination
    } else {
        hinCombination.style.display = 'none'
    }
}

// put the un data to the dom
const updateUn = (unData) => {
    const container = document.getElementById('description-second-line')
    if (!unData) {
        container.style.display = 'none'
        return
    }
    container.style.display = 'block'

    const unDescription = container.getElementsByClassName('un-description')[0]
    const unClass = container.getElementsByClassName('un-class')[0]

    unDescription.textContent = unData.description
    unClass.textContent = unData.class
}

// put the sources data to dom
const updateSources = (sources) => {
    const ul = document.getElementById('sources').getElementsByTagName('ul')[0]
    removeAllChildren(ul)

    for (const source of sources) {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.href = source.link
        a.textContent = source.name
        li.appendChild(a)
        ul.appendChild(li)
    }
}

// reinterpret the hin and un data and update the dom
const updateResults = async () => {
    const firstLine = document.getElementById('first-line-input').value.toUpperCase()
    const secondLine = document.getElementById('second-line-input').value.toUpperCase()

    const data = await getData()
    const hin = interpretHin(data, firstLine)
    const un = interpretUn(data, secondLine)

    updateHin(hin)
    updateUn(un)
    
}

document.getElementById('first-line-input').onchange = updateResults
document.getElementById('second-line-input').onchange = updateResults
document.getElementById('first-line-input').onkeyup = updateResults
document.getElementById('second-line-input').onkeyup = updateResults

document.addEventListener('DOMContentLoaded', loadData)
