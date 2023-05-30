import React from "react";
import ContactCard from "./card";
import contacts from "./contacts";

class MainAbout extends React.Component {
    render() {
        const contactsList = contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
        ));
        return (
            <div className="judul">
                {" "}
                <div className="judul1">ABOUT US</div>
                {contactsList}
            </div>
        );
    }
}
export default MainAbout;
