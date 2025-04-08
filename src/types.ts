export type UnData = {
    number: string,
    class: string,
    description: string
}

export type SourceData = {
    name: string,
    link: string,
    target: string
}

export type HinData = {
    digits: Array<string>,
    combination: string
}

export type Data = {
    hin: {
        digits: {[name: string]: string | Array<{
            digit_index: Array<number>,
            content: string
        }> | {
            relevant: boolean,
            content: string
        }},
        combinations: {[name: string]: string}

    },
    un: {[name: string]: UnData}
    sources: Array<SourceData>
}