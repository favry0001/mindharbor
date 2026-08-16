import { useState } from "react";

type Conversation = {
  id: number;
  nom: string;
  dernierMessage: string;
};

const conversations: Conversation[] = [
  {
    id: 1,
    nom: "Alex",
    dernierMessage: "Merci pour ton message.",
  },
  {
    id: 2,
    nom: "Sam",
    dernierMessage: "On se reparle demain.",
  },
  {
    id: 3,
    nom: "Chris",
    dernierMessage: "Bonne idée !",
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim()) {
      return;
    }

    setMessage("");
  }

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Échanger</p>
          <h1>Messagerie</h1>
          <p className="page-description">
            Discute en privé avec les personnes autorisées par tes paramètres.
          </p>
        </div>
      </section>

      <section className="messages-layout">
        <aside className="card conversations-list">
          <h2>Conversations</h2>

          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              className={
                selectedConversation === conversation.id
                  ? "conversation-item active"
                  : "conversation-item"
              }
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <strong>{conversation.nom}</strong>
              <span>{conversation.dernierMessage}</span>
            </button>
          ))}
        </aside>

        <section className="card chat-panel">
          <div className="chat-header">
            <div>
              <h2>Alex</h2>
              <span>Conversation privée</span>
            </div>
          </div>

          <div className="chat-messages">
            <div className="message received">
              <p>Salut, comment ça va aujourd’hui ?</p>
            </div>

            <div className="message sent">
              <p>Ça va mieux, merci. Et toi ?</p>
            </div>

            <div className="message received">
              <p>Ça va bien. Merci pour ton message.</p>
            </div>
          </div>

          <div className="message-form">
            <textarea
              rows={2}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Écris ton message..."
            />

            <button
              type="button"
              className="primary-button"
              onClick={handleSend}
            >
              Envoyer
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}