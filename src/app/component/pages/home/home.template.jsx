import React from "react";

export default ({ searchContact, getInteraction, getAllInteractions, addInteraction, updateInteraction, getAllInteractionsWithContactId, removeInteractionById, removeInteractionByContactId, removeAllInteraction, setAuthToken }) => {
    return (
        <div style={{margin: '6rem 2rem 0 2rem'}}>
            <span>Home</span>
            <div>---------</div>
            <div>---------</div>
            <div onClick={searchContact}>searchContact</div>
            <div>---------</div>
            <div>---------</div>
            <div onClick={getInteraction}>getInteraction</div>
            <div onClick={getAllInteractions}>getAllInteractions</div>
            <div onClick={getAllInteractionsWithContactId}>getInteractionsWithContactId</div>
            <div>---------</div>
            <div>---------</div>
            <div onClick={addInteraction}>addInteraction</div>
            <div onClick={updateInteraction}>updateInteraction</div>
            <div>---------</div>
            <div>---------</div>
            <div onClick={removeInteractionById}>removeInteractionById</div>
            <div onClick={removeInteractionByContactId}>removeInteractionByContactId</div>
            <div>---------</div>
            <div>---------</div>
            <div onClick={removeAllInteraction}>removeAllInteraction</div>
            <div>---------</div>
            <div>---------</div>
            <div onClick={setAuthToken}>setAuthToken</div>
        </div>
    );
};