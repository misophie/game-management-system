import React, { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import DummyImage from "../images/300.png";
import { LeaderboardComponent } from "../components/LeaderboardComponent";
import { EditableText } from "../components/TextEditable";
import axios from "axios";
import { sanitizeHTML } from "../functions";

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f0f0f0;
  min-height: 100vh; 
  width: 100%;
  justify-content: center; 
  gap: 10%;
  padding-top: 10%;
`;

const AvatarLeaderboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10%;
`

const PlayerDescription = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50%;
    gap: 10%;
`
const PlayerAvatar = styled.img`
    width: 300px;
    height: 300px;
`

const Text = styled.text`
    font-size: 16px;
    color: #333;
    font-weight: bold;
`
const AllFriendContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const FriendContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    max-width: 400px;
    overflow-x: auto;
`
const FriendAvatar = styled.img`
    width: 100px;
    height: 100px;
`
const AddFriendContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const AddFriendInput = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
`
const PageButton = styled.button`
  background-color: #007bff;
  color: white; 
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 50%;
`

export const PlayerProfile = () => {

    const [editable, setEditable] = useState(false);
    const [avatarEditable, setAvatarEditable] = useState(false);
    const [avatarText, setAvatarText] = useState('Click the button to edit me!');
    const [text, setText] = useState('Click the button to edit me!');
    const [data, setData] = useState('');
    const [avatarData, setAvatarData] = useState('');

    // To find passed in information about which user has logged in
    const location = useLocation();
    const profileData = location.state;

    if (!profileData){
        return(
            <div>
                Please sign in!
            </div>
        )
    }
    
    const { userInfo } = profileData;
    const email = userInfo[0][1];

    // handler functions
    const handleEditClick = () => {
        setEditable(!editable);
    };

    // handler functions
    const handleEditAvatarClick = () => {
        setAvatarEditable(!avatarEditable);
    };

    const handleSave = (editedText) => {
        setText(editedText);
        setEditable(false);

        const userInfo =  {
            newBio: sanitizeHTML(editedText),
            email: email
        }

        axios.post('http://localhost:55001/update-user-bio', userInfo)
        .then(response => {
        // Assuming the response contains the updated data
        setData(response.data.success.rows[0]);
        })
        .catch(error => console.error('Error fetching data:', error));

    };

    const handleSaveAvatar = (editedText) => {
        setAvatarText(editedText);
        setEditable(false);

        const userInfo =  {
            avatar: sanitizeHTML(editedText),
            email: email
        }

        axios.post('http://localhost:55001/update-user-avatar', userInfo)
        .then(response => {
        // Assuming the response contains the updated data
        setAvatarData(response.data.success.rows[0]);
        })
        .catch(error => console.error('Error fetching data:', error));

    };

    
    return(
        <PlayerContainer>
            <AvatarLeaderboardContainer>
            <PlayerAvatar src={DummyImage} alt="this is a dog" />
            <LeaderboardComponent title={"All Game Ranking"} />
            </AvatarLeaderboardContainer>

            <PlayerDescription>
                <Text>
                Email: {userInfo[0][1]}
                </Text>
                <Text>
                Avatar: <EditableText text={avatarText} isEditable={avatarEditable} onEdit={handleEditAvatarClick} onSave={handleSaveAvatar} />               
                </Text>
                <PageButton onClick={handleEditAvatarClick}>Edit button </PageButton>
                {avatarData && editable !== true ? "Success! Your old avatar was: " + avatarData + ". You can verify changes in the Query Available Game Tables." : null}

                <Text>
                Bio:<EditableText text={text} isEditable={editable} onEdit={handleEditClick} onSave={handleSave} />
                </Text>
                <PageButton onClick={handleEditClick}>Edit button </PageButton>
                {data && editable !== true ? "Success! Your old bio was: " + data + ". You can verify changes in the Query Available Game Tables." : null}
                
            
                <AllFriendContainer>
                <Text>
                    Friends
                </Text>
                <FriendContainer>
                    <FriendAvatar src={DummyImage} alt="this is a dog"  />
                    <FriendAvatar src={DummyImage} alt="this is a dog"  />
                    <FriendAvatar src={DummyImage} alt="this is a dog"  />
                    <FriendAvatar src={DummyImage} alt="this is a dog"  />
                </FriendContainer>
                </AllFriendContainer>
            
                <AddFriendContainer>
                <AddFriendInput 
                    type="text"
                    placeholder="Enter text here"/>
                <PageButton>Add Friend</PageButton>
                </AddFriendContainer>
            </PlayerDescription>

        </PlayerContainer>

    )
}