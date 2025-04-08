import data from '../data.json'
import { SourcesContainer } from '../style'

export default function Sources() {
    return (
        <SourcesContainer>
            <h2>Quellen</h2>
            <ul>
                {data.sources.map((source, key) =>
                    <li key={key}>
                        <a href={source.link}>{source.name}</a>
                    </li>
                )}
            </ul>
        </SourcesContainer>
    )
}