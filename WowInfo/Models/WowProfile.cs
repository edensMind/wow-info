using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WowInfo.Models
{
    public class WowProfile
    {
        public WowLinks _links { get; set; }
        public int id { get; set; }
        public List<WowAccount> wow_accounts { get; set; }
        public WowCollections collections { get; set; }
    }

    public class WowSelf
    {
        public string href { get; set; }
    }

    public class WowUser
    {
        public string href { get; set; }
    }

    public class WowProfileResponse
    {
        public string href { get; set; }
    }

    public class WowLinks
    {
        public WowSelf self { get; set; }
        public WowUser user { get; set; }
        public WowProfileResponse profile { get; set; }
    }

    public class Character2
    {
        public string href { get; set; }
    }

    public class ProtectedCharacter
    {
        public string href { get; set; }
    }

    public class WowKey
    {
        public string href { get; set; }
    }

    public class Realm
    {
        public WowKey key { get; set; }
        public string name { get; set; }
        public int id { get; set; }
        public string slug { get; set; }
    }

    public class WowKey2
    {
        public string href { get; set; }
    }

    public class PlayableClass
    {
        public WowKey2 key { get; set; }
        public string name { get; set; }
        public int id { get; set; }
    }

    public class WowKey3
    {
        public string href { get; set; }
    }

    public class PlayableRace
    {
        public WowKey3 key { get; set; }
        public string name { get; set; }
        public int id { get; set; }
    }

    public class Gender
    {
        public string type { get; set; }
        public string name { get; set; }
    }

    public class Faction
    {
        public string type { get; set; }
        public string name { get; set; }
    }

    public class Character
    {
        public Character2 character { get; set; }
        public ProtectedCharacter protected_character { get; set; }
        public string name { get; set; }
        public int id { get; set; }
        public Realm realm { get; set; }
        public PlayableClass playable_class { get; set; }
        public PlayableRace playable_race { get; set; }
        public Gender gender { get; set; }
        public Faction faction { get; set; }
        public int level { get; set; }
    }

    public class WowAccount
    {
        public int id { get; set; }
        public List<Character> characters { get; set; }
    }

    public class WowCollections
    {
        public string href { get; set; }
    }
}
