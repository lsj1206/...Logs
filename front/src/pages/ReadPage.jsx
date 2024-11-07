import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { styled } from "../styles/Theme";
// Components
import PageHeader from "../layouts/PageHeader";
import PageFooter from "../layouts/PageFooter";
import Comment from "../components/post/Comment";
import TextButton from "../components/button/TextButton";
// Toast UI Viewer
import MyViewer from "../components/post/MyViewer";
// API
const postURL = "http://127.0.0.1:8000/api/posts/";

const ReadPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // URL에서 postID 가져오기
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deletePost = async () => {
    try {
      const response = await axios.delete(`${postURL}delete/${postId}`);
      // setPost(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed Delete Post");
      setLoading(false);
    }
    navigate(-1);
  };

  useEffect(() => {
    // API 호출하여 포스트 데이터 가져오기
    const getPost = async () => {
      try {
        const response = await axios.get(`${postURL}detail/${postId}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to Load the Post");
        setLoading(false);
      }
    };

    getPost();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const createDate = formatDate(post.created_at);
  const updateDate = formatDate(post.created_at);

  return (
    <ReadPageContainer>
      <ViewContainer>
        <PageHeader children={<Title>{post?.title || "게시글 제목"}</Title>} />
        <InfoTextContainer>
          <LeftBox>
            <CategoryText>{`카테고리: React`}</CategoryText>
            <TagText>{`태그: Front | styled-component | FastAPI`}</TagText>
          </LeftBox>
          <RightBox>
            <InfoText>{`조회수: 777`}</InfoText>
            <InfoText>{`작성자: Faker`}</InfoText>
            <InfoText>{`작성일: ${createDate}(${updateDate})`}</InfoText>
          </RightBox>
        </InfoTextContainer>
        <ViewerContainer>
          <MyViewer Content={post.content} />
        </ViewerContainer>
        <Comment postId={post.id} comments={post.comments} />
        <PageFooter>{/* 댓글 영역 */}</PageFooter>
      </ViewContainer>
      <SideContainer>
        <SideBox>
          <DeleteButton size={[120, 30]} text={"게시글 삭제"} onClick={deletePost} />
        </SideBox>
      </SideContainer>
    </ReadPageContainer>
  );
};

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "2-digit" };
  return new Date(date).toLocaleDateString("ko-KR", options);
};

const ReadPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  position: relative;
  width: 1800px;
  background-color: transparent;
`;

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1400px;
`;

const Title = styled.h1`
  padding-top: 25px;
`;

const InfoTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const InfoText = styled.p`
  margin-right: 20px;
  color: ${({ theme }) => theme.bgText};
  font-weight: bolder;
`;

const CategoryText = styled(InfoText)`
  margin-left: 10px;
`;

const TagText = styled(InfoText)`
  margin-left: 10px;
`;

const ViewerContainer = styled.div`
  padding: 10px;
  width: 90%;
  background-color: ${({ theme }) => theme.bgMain};
  border-radius: 4px;
`;

const SideContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 60px 50px 50px 50px;
  width: 300px;
  box-sizing: border-box;
  background-color: transparent;
`;

const SideBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 10px;
  padding: 20px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.brLine};
  border-radius: 15px;
`;

const DeleteButton = styled(TextButton)`
  color: ${({ theme }) => theme.warningText};
`;

export default ReadPage;
