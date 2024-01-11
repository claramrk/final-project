type Props = {
  currentUserPhoto: string | null | undefined;
  photo: string | null | undefined;
  messageToMentor: string | null | undefined;
  responseFromMentor: string | null | undefined;
};

export default function MentorMenteeChatComponent(props: Props) {
  return (
    <>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                props.photo
                  ? props.photo
                  : 'https://res.cloudinary.com/dqmhbukkm/image/upload/v1700478300/ytlqy4gubosyfp9vpts7.png'
              }
            />
          </div>
        </div>
        <div className="chat-bubble">{props.messageToMentor}</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                props.currentUserPhoto
                  ? props.currentUserPhoto
                  : 'https://res.cloudinary.com/dqmhbukkm/image/upload/v1700478300/ytlqy4gubosyfp9vpts7.png'
              }
            />
          </div>
        </div>
        <p className="chat-bubble">{props.responseFromMentor}</p>
      </div>
    </>
  );
}
