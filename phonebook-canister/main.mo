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
  };

  private var phonebook_entries : [(Text,Entry)] = [];
  private var phonebook_names : [(Text)] = [];

  let phonebook = Map.HashMap<Name, Entry>(0, Text.equal, Text.hash);

  public func insert(name : Name, entry : Entry): async Text{
    var message : Text = "";
    var found : ?Entry = phonebook.get(name);
   
    if(found==null){
      phonebook.put(name, entry);
      message := "Contact added";
      return message;
    }else{ 
        message:="The contact already exist";
        return message;
    };
  };

  public func delete_contact(name : Name) : async ?Entry {
    phonebook.remove(name);
  };

  public func show_phonebook() : async [(Text,Entry)]{
    phonebook_entries := Iter.toArray(phonebook.entries());
    return phonebook_entries;
  };

  public query func lookup(name : Name) : async ?Entry {
    phonebook.get(name);
  };

  public query func get_names() : async [(Text)] {
    phonebook_names := Iter.toArray(phonebook.keys());
    return phonebook_names;
  };

  public query func get_size() : async Int{
    return phonebook.size();
  }


};