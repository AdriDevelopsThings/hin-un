import rawData from '../data.json'
import { Data, HinData, UnData } from '../types'

const data = rawData as Data

export function interpretHin(hin: string): HinData {
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
                if (eachHinDigitData.digit_index.includes(index)) {
                    digitOutput.push(eachHinDigitData.content)
                }
            }
        }
    }
    const combinationMeaning = data.hin.combinations[hin as keyof typeof data.hin.combinations]
    return {
        digits: digitOutput,
        combination: combinationMeaning
    }
}

// return the json object for this un (if exists)
export function interpretUn(un: string): UnData {
    return data.un[parseInt(un).toString() as keyof typeof data.un]
}