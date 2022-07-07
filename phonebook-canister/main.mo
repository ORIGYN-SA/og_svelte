import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Iter "mo:base/Iter";

actor {
 
  type Name = Text;
  type Phone = Text;

  type Entry = {
    desc: Text;
    phone: Phone;
    data: Int;
  };

  private var phonebook_entries : [(Text,Entry)] = [];

  let phonebook = Map.HashMap<Name, Entry>(0, Text.equal, Text.hash);

  public func insert(name : Name, entry : Entry): async (){
    phonebook.put(name, entry);
  };

  public query func lookup(name : Name) : async ?Entry {
    phonebook.get(name);
  };

  public func show_phonebook() : async [(Text,Entry)]{
    phonebook_entries := Iter.toArray(phonebook.entries());
    return phonebook_entries;
  };

};