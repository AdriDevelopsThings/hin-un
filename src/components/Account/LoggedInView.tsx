import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FoundSubstance, FriendInvite, Friend, User } from '../../types'
import {
  acceptInvite, denyInvite, friendSubstances, inviteFriend, listFriends, listInvites, listSubstances
} from '../../utils/api'
import { interpretUn } from '../../utils/interpreter'
import {
  DiffColumn, DiffGrid, FieldRow, FriendRow, InviteForm, List, ListItem, LogoutButton, SectionHeading, SubmitButton
} from './style'

type Props = {
  user: User
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  return `${day}.${month}.${d.getFullYear()}`
}

function substanceLabel(un: number) {
  const description = interpretUn(String(un))?.description
  return description ? `UN ${un} – ${description}` : `UN ${un}`
}

export default function LoggedInView({ user }: Props) {
  const { logout } = useAuth()
  const [substances, setSubstances] = useState<FoundSubstance[] | null>(null)
  const [friends, setFriends] = useState<Friend[] | null>(null)
  const [invites, setInvites] = useState<FriendInvite[] | null>(null)
  const [inviteHandle, setInviteHandle] = useState('')
  const [inviteError, setInviteError] = useState<string | null>(null)
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)
  const [friendDiffSubstances, setFriendDiffSubstances] = useState<FoundSubstance[] | null>(null)

  useEffect(() => {
    listSubstances().then(setSubstances).catch(() => setSubstances([]))
    listFriends().then(setFriends).catch(() => setFriends([]))
    listInvites().then(setInvites).catch(() => setInvites([]))
  }, [])

  useEffect(() => {
    if (!selectedFriend) {
      setFriendDiffSubstances(null)
      return
    }
    friendSubstances(selectedFriend.user_id).then(setFriendDiffSubstances).catch(() => setFriendDiffSubstances([]))
  }, [selectedFriend])

  const onInvite = async (e: FormEvent) => {
    e.preventDefault()
    setInviteError(null)
    try {
      await inviteFriend(inviteHandle)
      setInviteHandle('')
    } catch {
      setInviteError('Einladung fehlgeschlagen. Bitte das Mastodon-Handle prüfen.')
    }
  }

  const onAccept = async (invite: FriendInvite) => {
    await acceptInvite(invite.invite_id)
    setInvites(prev => prev?.filter(i => i.invite_id !== invite.invite_id) ?? null)
    listFriends().then(setFriends).catch(() => {})
  }

  const onDeny = async (invite: FriendInvite) => {
    await denyInvite(invite.invite_id)
    setInvites(prev => prev?.filter(i => i.invite_id !== invite.invite_id) ?? null)
  }

  const ownUns = new Set((substances ?? []).map(s => s.un))
  const friendUns = new Set((friendDiffSubstances ?? []).map(s => s.un))
  const onlyYou = [...ownUns].filter(un => !friendUns.has(un))
  const both = [...ownUns].filter(un => friendUns.has(un))
  const onlyFriend = [...friendUns].filter(un => !ownUns.has(un))

  return (
    <div>
      <h2>{user.mastodon_handle}</h2>
      <LogoutButton type='button' onClick={logout}>Abmelden</LogoutButton>

      <SectionHeading>Verlauf</SectionHeading>
      {substances === null ? <p>Lädt…</p> : substances.length === 0 ? <p>Noch keine Stoffe gefunden.</p> : (
        <List>
          {substances
            .slice()
            .sort((a, b) => new Date(b.last_found).getTime() - new Date(a.last_found).getTime())
            .map(s => (
              <ListItem key={s.un}>
                {substanceLabel(s.un)} — zuletzt {formatDate(s.last_found)}
              </ListItem>
            ))}
        </List>
      )}

      <SectionHeading>Freunde</SectionHeading>
      <InviteForm onSubmit={onInvite}>
        <FieldRow>
          <label htmlFor='invite-handle'>Freund einladen (Mastodon-Handle)</label>
          <input
            id='invite-handle'
            type='text'
            placeholder='user@mastodon.social'
            value={inviteHandle}
            onChange={e => setInviteHandle(e.target.value)}
            required
          />
        </FieldRow>
        {inviteError && <p role='alert'>{inviteError}</p>}
        <SubmitButton type='submit'>Einladen</SubmitButton>
      </InviteForm>

      {invites && invites.length > 0 && (
        <>
          <SectionHeading>Offene Einladungen</SectionHeading>
          <List>
            {invites.map(invite => (
              <ListItem key={invite.invite_id}>
                {invite.from_handle}
                <button type='button' onClick={() => onAccept(invite)}>Annehmen</button>
                <button type='button' onClick={() => onDeny(invite)}>Ablehnen</button>
              </ListItem>
            ))}
          </List>
        </>
      )}

      {friends === null ? <p>Lädt…</p> : friends.length === 0 ? <p>Noch keine Freunde.</p> : (
        <List>
          {friends
            .slice()
            .sort((a, b) => b.substances_found - a.substances_found)
            .map(friend => (
              <FriendRow
                key={friend.user_id}
                type='button'
                $active={selectedFriend?.user_id === friend.user_id}
                onClick={() => setSelectedFriend(prev => prev?.user_id === friend.user_id ? null : friend)}
              >
                <span>{friend.mastodon_handle}</span>
                <span>{friend.substances_found}</span>
              </FriendRow>
            ))}
        </List>
      )}

      {selectedFriend && (
        <>
          <SectionHeading>Vergleich mit {selectedFriend.mastodon_handle}</SectionHeading>
          {friendDiffSubstances === null ? <p>Lädt…</p> : (
            <DiffGrid>
              <DiffColumn>
                <h3>Nur du</h3>
                <List>{onlyYou.map(un => <ListItem key={un}>{substanceLabel(un)}</ListItem>)}</List>
              </DiffColumn>
              <DiffColumn>
                <h3>Beide</h3>
                <List>{both.map(un => <ListItem key={un}>{substanceLabel(un)}</ListItem>)}</List>
              </DiffColumn>
              <DiffColumn>
                <h3>Nur {selectedFriend.mastodon_handle}</h3>
                <List>{onlyFriend.map(un => <ListItem key={un}>{substanceLabel(un)}</ListItem>)}</List>
              </DiffColumn>
            </DiffGrid>
          )}
        </>
      )}
    </div>
  )
}
