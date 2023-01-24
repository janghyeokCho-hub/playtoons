import { Link } from "react-router-dom";
import styled from "styled-components";
import useFilePath from "@/hook/useFilePath";
const AuthorItem = ({ author }) => {
  const { filePath: profileImg } = useFilePath(author?.profileImage);
  const { filePath: backgroundImg } = useFilePath(author?.backgroundImage);
  return (
    <div className="box_profile">
      <Link to="">
        <ImgDiv className="pf_thumb" bgImg={backgroundImg}></ImgDiv>
        <div className="pf_txt">
          <div className="icon">
            <img src={profileImg} alt="profile" />
          </div>
          <p className="h1">{author?.nickname}</p>
          <p className="t1">{author?.description}</p>
        </div>
      </Link>
    </div>
  );
};

const ImgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
`;

export default AuthorItem;
