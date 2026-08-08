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

export type User = {
  id: string,
  mastodon_handle: string
}

export type FoundSubstance = {
  un: number,
  first_found: string,
  last_found: string
}

export type Friend = {
  user_id: string,
  mastodon_handle: string,
  substances_found: number
}

export type ReceivedInvite = {
  invite_id: string,
  from_handle: string,
  created_at: string
}

export type SentInvite = {
  invite_id: string,
  to_handle: string,
  created_at: string
}

export type RedirectResponse = {
  redirect_url: string
}