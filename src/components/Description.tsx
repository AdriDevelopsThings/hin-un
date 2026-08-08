import { DescriptionContainer } from '../style'
import { interpretHin, interpretUn } from '../utils/interpreter'
import SaveSubstanceButton from './SaveSubstanceButton'

type Props = {
  hinContent: string,
  unContent: string
}

export default function Description({ hinContent, unContent }: Props) {
  const hinData = interpretHin(hinContent)
  const unData = interpretUn(unContent)

  return (
    <DescriptionContainer>
      {hinData && (hinData.digits.length > 0 || hinData.combination) ? <div>
        <h2>Gefahrnummer</h2>
        {hinData.digits.length > 0 ? <div>
          <h3>Bedeutung der Kennziffern</h3>
          <ul>
            {hinData.digits.map((d, k) =>
              <li key={k}>{d}</li>
            )}
          </ul>
        </div> : null}
        {hinData.combination ? <div>
          <p>Bedeutung der Kombination: <span>{hinData.combination}</span></p>
        </div> : null}
      </div> : null}
      {unData ? <div>
        <h2>UN Nummer <SaveSubstanceButton un={parseInt(unData.number, 10)} hinContent={hinContent} /></h2>
        <ul>
          <li>Stoff: {unData.description}</li>
          <li>Klasse: {unData.class}</li>
        </ul>
      </div> : null}
    </DescriptionContainer>
  )
}
