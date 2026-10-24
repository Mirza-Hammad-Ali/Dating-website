import { useMemo, useState } from "react";
import "./App.css";

const people = [
  {
    id: 1,
    name: "Sofia",
    age: 26,
    city: "Brooklyn, NY",
    distance: "2 miles away",
    photo: "photo-1534528741775-53994a69daeb",
    tags: ["Art", "Coffee", "Travel"],
    bio: "Collecting little moments, big books, and the best neighborhood pasta spots.",
    online: true,
    compatibility: 98,
  },
  {
    id: 2,
    name: "Olivia",
    age: 28,
    city: "Manhattan, NY",
    distance: "4 miles away",
    photo: "photo-1524504388940-b1c1722653e1",
    tags: ["Design", "Hiking", "Dogs"],
    bio: "Designer by day, trail-seeker on weekends. Tell me your favorite view.",
    online: true,
    compatibility: 95,
  },
  {
    id: 3,
    name: "Amara",
    age: 25,
    city: "Queens, NY",
    distance: "6 miles away",
    photo: "photo-1529139574466-a303027c1d8b",
    tags: ["Music", "Food", "Yoga"],
    bio: "Here for live music, spontaneous dinners, and someone who laughs easily.",
    online: false,
    compatibility: 93,
  },
  {
    id: 4,
    name: "Charlotte",
    age: 27,
    city: "Jersey City, NJ",
    distance: "8 miles away",
    photo: "photo-1524250502761-1ac6f2e30d43",
    tags: ["Books", "Film", "Art"],
    bio: "Film camera always in my bag. Looking for my favorite co-star.",
    online: true,
    compatibility: 91,
  },
  {
    id: 5,
    name: "Maya",
    age: 29,
    city: "Williamsburg, NY",
    distance: "3 miles away",
    photo: "photo-1517841905240-472988babdf9",
    tags: ["Cooking", "Travel", "Plants"],
    bio: "I make a mean Sunday breakfast and an even better travel itinerary.",
    online: true,
    compatibility: 89,
  },
  {
    id: 6,
    name: "Grace",
    age: 26,
    city: "Astoria, NY",
    distance: "7 miles away",
    photo: "photo-1531123897727-8f129e1688ce",
    tags: ["Running", "Coffee", "Music"],
    bio: "Morning runner, afternoon latte enthusiast, full-time playlist curator.",
    online: false,
    compatibility: 87,
  },
];

const initialChats = [
  {
    id: 1,
    name: "Sofia",
    age: 26,
    photo: people[0].photo,
    online: true,
    preview: "That sounds like the perfect Sunday ☀️",
    time: "2m",
    unread: 2,
    messages: [
      { from: "them", text: "Hey! I saw you love little coffee shops too ☕" },
      {
        from: "me",
        text: "Always looking for a new favorite. Any recommendations?",
      },
      { from: "them", text: "That sounds like the perfect Sunday ☀️" },
    ],
  },
  {
    id: 2,
    name: "Olivia",
    age: 28,
    photo: people[1].photo,
    online: true,
    preview: "I know a trail with the best views!",
    time: "18m",
    unread: 0,
    messages: [{ from: "them", text: "I know a trail with the best views!" }],
  },
  {
    id: 3,
    name: "Amara",
    age: 25,
    photo: people[2].photo,
    online: false,
    preview: "You have great taste in music",
    time: "1h",
    unread: 0,
    messages: [{ from: "me", text: "You have great taste in music" }],
  },
  {
    id: 4,
    name: "Charlotte",
    age: 27,
    photo: people[3].photo,
    online: true,
    preview: "Deal! I’ll bring my camera 📸",
    time: "3h",
    unread: 0,
    messages: [{ from: "them", text: "Deal! I’ll bring my camera 📸" }],
  },
];

const imageUrl = (photo, width = 600) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${width}&q=85`;

function Icon({ name, size = 20, ...props }) {
  const paths = {
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    message: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3 6.3-2.1Z" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
        <path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    sliders: (
      <>
        <path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    close: <path d="m18 6-12 12M6 6l12 12" />,
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
    camera: (
      <>
        <path d="M14 4h-4L8 7H4v13h16V7h-4l-2-3Z" />
        <circle cx="12" cy="13" r="3" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("Discover");
  const [activeChat, setActiveChat] = useState(1);
  const [chats, setChats] = useState(initialChats);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState([]);
  const [passed, setPassed] = useState([]);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("join");
  const [showFilters, setShowFilters] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [toast, setToast] = useState("");

  const visiblePeople = useMemo(
    () =>
      people.filter((person) => {
        const queryMatches =
          `${person.name} ${person.city} ${person.tags.join(" ")}`
            .toLowerCase()
            .includes(search.toLowerCase());
        const tabMatches = activeTab !== "Likes" || liked.includes(person.id);
        return (
          queryMatches &&
          tabMatches &&
          !passed.includes(person.id) &&
          (!onlineOnly || person.online)
        );
      }),
    [search, passed, onlineOnly, activeTab, liked],
  );
  const selectedChat = chats.find((chat) => chat.id === activeChat) || chats[0];

  const showNotice = (text) => {
    setToast(text);
    window.setTimeout(() => setToast(""), 2600);
  };

  const likePerson = (person) => {
    setLiked((current) =>
      current.includes(person.id) ? current : [...current, person.id],
    );
    setChats((current) =>
      current.some((chat) => chat.name === person.name)
        ? current
        : [
            {
              id: Date.now(),
              name: person.name,
              age: person.age,
              photo: person.photo,
              online: person.online,
              preview: "You matched! Say hello 👋",
              time: "now",
              unread: 0,
              messages: [
                {
                  from: "them",
                  text: `Hey! Nice to meet you 😊 What do you love most about ${person.city.split(",")[0]}?`,
                },
              ],
            },
            ...current,
          ],
    );
    showNotice(`It's a match with ${person.name}! 💜`);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const text = message.trim();
    if (!text || !selectedChat) return;
    setChats((current) =>
      current.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              preview: text,
              time: "now",
              messages: [...chat.messages, { from: "me", text }],
            }
          : chat,
      ),
    );
    setMessage("");
  };

  const navigate = (tab) => {
    setActiveTab(tab);
    if (tab === "Likes")
      showNotice(`${liked.length} people have caught your eye 💜`);
    if (tab === "Messages")
      document
        .querySelector(".messages-section")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="app-shell min-h-screen">
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            navigate("Discover");
          }}
        >
          <span className="brand-mark">
            <Icon name="heart" size={21} />
          </span>
          <span>
            dear<span className="brand-accent">ly</span>
          </span>
        </a>
        <div className="sidebar-label">MENU</div>
        <nav className="main-nav" aria-label="Main navigation">
          {[
            { name: "Discover", icon: "compass" },
            { name: "Likes", icon: "heart", count: liked.length || null },
            { name: "Messages", icon: "message", count: "2" },
          ].map((item) => (
            <button
              className={`nav-item ${activeTab === item.name ? "active" : ""}`}
              key={item.name}
              onClick={() => navigate(item.name)}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.name}</span>
              {item.count && <span className="nav-count">{item.count}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-label communities-label">YOUR VIBE</div>
        <div className="vibe-card">
          <span className="vibe-icon">
            <Icon name="spark" size={17} />
          </span>
          <div>
            <strong>Looking for</strong>
            <span>Something real</span>
          </div>
          <span className="vibe-dot" />
        </div>
        <div className="sidebar-spacer" />
        <div className="sidebar-promo">
          <div className="promo-glow">✦</div>
          <p className="promo-title">
            Good things take a little <em>magic.</em>
          </p>
          <p className="promo-copy">Your next great story starts here.</p>
          <button
            onClick={() => {
              setAuthMode("join");
              setShowAuth(true);
            }}
          >
            Make it happen <Icon name="arrow" size={15} />
          </button>
        </div>
        <button
          className="profile-mini"
          onClick={() => {
            setAuthMode("login");
            setShowAuth(true);
          }}
        >
          <span className="mini-avatar">J</span>
          <span className="mini-info">
            <strong>Jamie Parker</strong>
            <small>My profile</small>
          </span>
          <span className="profile-dots">•••</span>
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-mark">
              <Icon name="heart" size={19} />
            </span>{" "}
            dear<span className="brand-accent">ly</span>
          </div>
          <div className="breadcrumb">
            <span>Pages</span>
            <span className="crumb-slash">/</span>
            <strong>{activeTab}</strong>
          </div>
          <div className="topbar-actions">
            <button
              className="icon-button search-button"
              aria-label="Search"
              onClick={() => document.querySelector(".search-input")?.focus()}
            >
              <Icon name="search" size={19} />
            </button>
            <button
              className="top-avatar"
              aria-label="Sign in"
              onClick={() => {
                setAuthMode("login");
                setShowAuth(true);
              }}
            >
              J
            </button>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> YOUR STORY STARTS HERE
              </div>
              <h1>
                {activeTab === "Discover" ? (
                  <>
                    A little closer to <span>something real.</span>
                  </>
                ) : activeTab === "Messages" ? (
                  <>
                    Good conversations, <span>great connections.</span>
                  </>
                ) : (
                  <>
                    Look who’s <span>into you.</span>
                  </>
                )}
              </h1>
              <p className="welcome-subtitle">
                Meet people who make the everyday feel a little more special.
              </p>
            </div>
            <button
              className="join-button"
              onClick={() => {
                setAuthMode("join");
                setShowAuth(true);
              }}
            >
              Create your profile <Icon name="arrow" size={16} />
            </button>
          </section>

          <section className="hero-banner">
            <img
              src={imageUrl("photo-1516589178581-6cd7833ae3b2", 1400)}
              alt=""
              className="hero-image"
            />
            <div className="hero-shade" />
            <div className="hero-copy">
              <span className="hero-kicker">
                <Icon name="spark" size={15} /> FOR THE LOVE OF REAL
              </span>
              <h2>
                Less swiping.
                <br />
                More <em>spark.</em>
              </h2>
              <p>Meet someone who just gets you.</p>
              <button
                className="hero-cta"
                onClick={() =>
                  document
                    .querySelector(".discover-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Find your person <Icon name="arrow" size={16} />
              </button>
            </div>
            <div className="hero-pagination">
              <span className="pagination-active" />
              <span />
              <span />
            </div>
            <div className="hero-note">
              <span className="hero-note-icon">♡</span>
              <span>
                <strong>Made for meaningful</strong>
                <small>connections, not just clicks</small>
              </span>
            </div>
          </section>

          <section className="discover-section">
            <div className="section-heading">
              <div>
                <div className="section-kicker">YOUR PEOPLE ARE OUT THERE</div>
                <h2>
                  {activeTab === "Likes" ? "People you like" : "Made for you"}{" "}
                  <span className="heading-spark">✳</span>
                </h2>
                <p>Thoughtful connections, picked just for you.</p>
              </div>
              <div className="discover-controls">
                <label className="search-field">
                  <Icon name="search" size={17} />
                  <input
                    className="search-input"
                    type="search"
                    placeholder="Search people..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>
                <button
                  className={`filter-button ${showFilters ? "filter-active" : ""}`}
                  onClick={() => setShowFilters((value) => !value)}
                  aria-expanded={showFilters}
                >
                  <Icon name="sliders" size={17} /> <span>Filters</span>
                  <span className="filter-dot" />
                </button>
              </div>
            </div>
            {showFilters && (
              <div className="filter-panel">
                <div>
                  <strong>Who’s online</strong>
                  <span>See people active right now</span>
                </div>
                <button
                  className={`toggle ${onlineOnly ? "toggle-on" : ""}`}
                  onClick={() => setOnlineOnly((value) => !value)}
                  aria-label="Toggle online people"
                >
                  <span />
                </button>
              </div>
            )}
            <div className="people-grid">
              {visiblePeople.map((person) => (
                <article className="person-card" key={person.id}>
                  <div className="person-photo-wrap">
                    <img
                      className="person-photo"
                      src={imageUrl(person.photo)}
                      alt={`${person.name}, ${person.age}`}
                      loading="lazy"
                    />
                    <div className="photo-gradient" />
                    {person.online && (
                      <span className="online-pill">
                        <span /> Online now
                      </span>
                    )}
                    <button
                      className={`card-heart ${liked.includes(person.id) ? "is-liked" : ""}`}
                      aria-label={
                        liked.includes(person.id)
                          ? `Unlike ${person.name}`
                          : `Like ${person.name}`
                      }
                      onClick={() => likePerson(person)}
                    >
                      <Icon name="heart" size={18} />
                    </button>
                    <div className="photo-name">
                      <span className="compatibility">
                        {person.compatibility}% match
                      </span>
                      <h3>
                        {person.name}
                        <span>, {person.age}</span>
                      </h3>
                      <p>
                        <Icon name="pin" size={13} /> {person.city}
                      </p>
                    </div>
                  </div>
                  <div className="person-details">
                    <p className="person-bio">{person.bio}</p>
                    <div className="tag-row">
                      {person.tags.map((tag) => (
                        <span className="interest-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="card-footer">
                      <span>{person.distance}</span>
                      <button
                        onClick={() => {
                          const match = chats.find(
                            (chat) => chat.name === person.name,
                          );
                          if (match) {
                            setActiveChat(match.id);
                            navigate("Messages");
                          } else likePerson(person);
                        }}
                      >
                        <Icon name="message" size={15} /> Say hello
                      </button>
                    </div>
                  </div>
                  <button
                    className="pass-button"
                    aria-label={`Pass on ${person.name}`}
                    onClick={() => {
                      setPassed((current) => [...current, person.id]);
                      showNotice(`Profile hidden`);
                    }}
                  >
                    ×
                  </button>
                </article>
              ))}
              {visiblePeople.length === 0 && (
                <div className="empty-state">
                  <span>♡</span>
                  <h3>
                    {activeTab === "Likes" && liked.length === 0
                      ? "Your story is just beginning"
                      : "No new faces just yet"}
                  </h3>
                  <p>
                    {activeTab === "Likes" && liked.length === 0
                      ? "Like someone who catches your eye and you’ll find them here."
                      : "Try another search or adjust your filters to meet more people."}
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setOnlineOnly(false);
                      setPassed([]);
                      if (activeTab === "Likes" && liked.length === 0)
                        navigate("Discover");
                    }}
                  >
                    Show everyone
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="messages-section">
            <div className="messages-heading">
              <div>
                <div className="section-kicker">KEEP THE SPARK GOING</div>
                <h2>
                  Your conversations{" "}
                  <span className="message-count">{chats.length}</span>
                </h2>
              </div>
              <button className="see-all" onClick={() => navigate("Messages")}>
                See all <Icon name="arrow" size={15} />
              </button>
            </div>
            <div className="chat-panel">
              <div className="chat-list">
                <div className="chat-list-head">
                  <strong>Messages</strong>
                  <button
                    aria-label="More messages"
                    onClick={() => showNotice("You’re all caught up!")}
                  >
                    •••
                  </button>
                </div>
                {chats.slice(0, 4).map((chat) => (
                  <button
                    key={chat.id}
                    className={`chat-preview ${selectedChat?.id === chat.id ? "chat-selected" : ""}`}
                    onClick={() => setActiveChat(chat.id)}
                  >
                    <span className="chat-avatar-wrap">
                      <img src={imageUrl(chat.photo, 100)} alt="" />
                      <span
                        className={`avatar-status ${chat.online ? "status-online" : ""}`}
                      />
                    </span>
                    <span className="chat-preview-content">
                      <span className="chat-preview-top">
                        <strong>
                          {chat.name}, {chat.age}
                        </strong>
                        <small>{chat.time}</small>
                      </span>
                      <span className="chat-preview-bottom">
                        <span>{chat.preview}</span>
                        {chat.unread > 0 && <i>{chat.unread}</i>}
                      </span>
                    </span>
                  </button>
                ))}
                <button
                  className="all-messages-link"
                  onClick={() => navigate("Messages")}
                >
                  View all messages <Icon name="arrow" size={14} />
                </button>
              </div>
              <div className="conversation">
                {selectedChat ? (
                  <>
                    <div className="conversation-head">
                      <div className="conversation-person">
                        <span className="chat-avatar-wrap">
                          <img src={imageUrl(selectedChat.photo, 100)} alt="" />
                          <span
                            className={`avatar-status ${selectedChat.online ? "status-online" : ""}`}
                          />
                        </span>
                        <div>
                          <strong>
                            {selectedChat.name}, {selectedChat.age}
                          </strong>
                          <small>
                            {selectedChat.online
                              ? "Active now"
                              : "Last seen recently"}
                          </small>
                        </div>
                      </div>
                      <button
                        className="conversation-menu"
                        aria-label="More options"
                        onClick={() => showNotice("Conversation options")}
                      >
                        •••
                      </button>
                    </div>
                    <div className="conversation-body">
                      <div className="day-divider">
                        <span /> TODAY <span />
                      </div>
                      {selectedChat.messages.map((item, index) => (
                        <div
                          key={`${selectedChat.id}-${index}`}
                          className={`message-row ${item.from === "me" ? "my-message" : ""}`}
                        >
                          {item.from === "them" && (
                            <img
                              src={imageUrl(selectedChat.photo, 80)}
                              alt=""
                              className="message-avatar"
                            />
                          )}
                          <div className="message-bubble">
                            {item.text}
                            {item.from === "me" && (
                              <span className="message-check">
                                <Icon name="check" size={12} /> Seen
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <form className="message-form" onSubmit={sendMessage}>
                      <button
                        type="button"
                        className="attach-button"
                        aria-label="Add photo"
                        onClick={() =>
                          showNotice("Photo sharing is coming soon")
                        }
                      >
                        <Icon name="camera" size={19} />
                      </button>
                      <input
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder={`Message ${selectedChat.name}...`}
                        aria-label={`Message ${selectedChat.name}`}
                      />
                      <button
                        className="send-button"
                        type="submit"
                        disabled={!message.trim()}
                        aria-label="Send message"
                      >
                        <Icon name="send" size={17} />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="empty-conversation">
                    Choose a conversation to say hello.
                  </div>
                )}
              </div>
            </div>
          </section>
          <footer className="page-footer">
            <span>© 2025 Dearly. Made with a little more heart.</span>
            <div>
              <button
                onClick={() =>
                  showNotice("You deserve to feel safe and respected.")
                }
              >
                Your safety
              </button>
              <button onClick={() => showNotice("We’re here to help.")}>
                Get help
              </button>
              <button
                onClick={() =>
                  showNotice("Privacy settings are ready in your profile.")
                }
              >
                Privacy
              </button>
            </div>
          </footer>
        </div>
      </main>

      {toast && (
        <div className="toast" role="status">
          <span>♡</span>
          {toast}
        </div>
      )}
      {showAuth && (
        <div className="modal-backdrop" onClick={() => setShowAuth(false)}>
          <section
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close"
              onClick={() => setShowAuth(false)}
            >
              <Icon name="close" size={20} />
            </button>
            <span className="modal-heart">
              <Icon name="heart" size={24} />
            </span>
            <div className="section-kicker">
              {authMode === "join" ? "YOUR NEXT CHAPTER" : "WELCOME BACK"}
            </div>
            <h2 id="auth-title">
              {authMode === "join"
                ? "A good thing starts here."
                : "Good to see you again."}
            </h2>
            <p>
              {authMode === "join"
                ? "Create a profile and meet people who are looking for something real, too."
                : "Sign in to pick up where your story left off."}
            </p>
            <form
              className="auth-form"
              onSubmit={(event) => {
                event.preventDefault();
                setShowAuth(false);
                showNotice(
                  authMode === "join"
                    ? "Your profile journey is ready to begin! ✨"
                    : "Welcome back! ✨",
                );
              }}
            >
              <label>
                Your email
                <input type="email" placeholder="you@example.com" required />
              </label>
              <label>
                Password
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  minLength="8"
                  required
                />
              </label>
              {authMode === "join" && (
                <label>
                  I’m interested in
                  <select defaultValue="">
                    <option value="" disabled>
                      Select who you’d like to meet
                    </option>
                    <option>Women</option>
                    <option>Men</option>
                    <option>Everyone</option>
                  </select>
                </label>
              )}
              <button className="auth-submit" type="submit">
                {authMode === "join" ? "Create my account" : "Sign in"}{" "}
                <Icon name="arrow" size={16} />
              </button>
            </form>
            <div className="auth-switch">
              {authMode === "join"
                ? "Already have an account?"
                : "New to Dearly?"}{" "}
              <button
                onClick={() =>
                  setAuthMode(authMode === "join" ? "login" : "join")
                }
              >
                {authMode === "join" ? "Sign in" : "Join us"}
              </button>
            </div>
            <small className="auth-disclaimer">
              By continuing, you agree to be kind, honest, and yourself.
            </small>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
