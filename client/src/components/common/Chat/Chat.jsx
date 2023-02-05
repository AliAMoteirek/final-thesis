import send from './assets/send.svg';
import bot from './assets/bot.png';
import loadingIcon from './assets/loader.svg';
import Container from '../Container';
import './Chat.css';
import { useSelector } from 'react-redux';
import TextAvatar from '../TextAvatar/TextAvatar';
import { useEffect, useRef, useState } from 'react';
import chatApi from '../../../api/modules/chatApi';
import { toast } from 'react-toastify';

const Chat = () => {
  const [input, setInput] = useState('');
  const { user } = useSelector((state) => state.user);
  let arr = [
    { type: 'bot', post: `Welcome "${user.displayName}" to our chat service!` },
  ];
  const [posts, setPosts] = useState(arr);
  const messagesEndRef = useRef(null);

  const fetchBotResponse = async () => {
    const { response, error } = await chatApi.add({ input });

    if (error) toast.error(error.message);

    if (response) {
      toast.success('Successfully sent a chat');
      return response;
    }
  };

  const onSubmit = () => {
    if (input.trim() === '') return;
    updatePosts(input);
    updatePosts('loading...', false, true);
    setInput('');
    fetchBotResponse().then((res) => {
      updatePosts(res.bot.trim(), true);
    });
  };

  const autoTypingBotResponse = (text) => {
    let index = 0;
    let interval = setInterval(() => {
      if (index < text.length) {
        setPosts((prevState) => {
          let lastItem = prevState.pop();

          if (lastItem.type !== 'bot') {
            prevState.push({
              type: 'bot',
              post: text.charAt(index - 1),
            });
          } else {
            prevState.push({
              type: 'bot',
              post: lastItem.post + text.charAt(index - 1),
            });
          }

          return [...prevState];
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  };

  const updatePosts = (post, isBot, isLoading) => {
    if (isBot) {
      autoTypingBotResponse(post);
    } else {
      setPosts((prevState) => {
        return [...prevState, { type: isLoading ? 'loading' : 'user', post }];
      });
    }
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter' || e.which === 13) {
      onSubmit();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [posts]);

  return (
    <Container header={'Chat'}>
      <div>
        <main className="chatGPT-app" style={{ borderRadius: '10px' }}>
          <section className="chat-container">
            <div className="layout">
              {posts.map((post, index) => (
                <div
                  className={`chat-bubble ${
                    post.type === 'bot' || post.type === 'loading' ? 'bot' : ''
                  }`}
                  key={index}
                >
                  <div className="avatar">
                    {(user && post.type === 'bot') ||
                    post.type === 'loading' ? (
                      <img src={bot} alt="" />
                    ) : (
                      <TextAvatar text={user.displayName} />
                    )}
                  </div>
                  {post.type === 'loading' ? (
                    <div className="loader">
                      <img src={loadingIcon} alt="" />
                    </div>
                  ) : (
                    <div className="post" ref={messagesEndRef}>
                      {post.post}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
          <footer>
            <input
              value={input}
              className="composebar"
              autoFocus
              type="text"
              placeholder="Ask Anything"
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={onKeyUp}
            />
            <div className="send-button" onClick={onSubmit}>
              <img src={send} alt="" />
            </div>
          </footer>
        </main>
      </div>
    </Container>
  );
};

export default Chat;
