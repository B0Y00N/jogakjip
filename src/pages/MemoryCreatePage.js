import React, { useState } from "react";
import "./FormPage.css";
import Header from "../components/Header";

const MemoryCreatePage = ({ onSubmit }) => {
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState(""); // 입력 중인 태그
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [moment, setMoment] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [password, setPassword] = useState("");

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault(); 

      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  // 태그 삭제 핸들러
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 폼 제출 핸들러
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      nickname,
      title,
      tags,
      location,
      image,
      content,
      moment,
      isPublic,
      password,
    });
  };

  return (
    <div className="create-content">
      <Header />
      <h2>추억 올리기</h2>
      <form name="MemoryCreateForm" className="create-form" onSubmit={handleSubmit}>
        <div className="create-form-body">
          <div className="left-section">
            <div className="input-group">
              <label>닉네임</label>
              <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임을 입력해 주세요" required />
            </div>
            <div className="input-group">
              <label>제목</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해 주세요" required />
            </div>
            <div className="input-group">
              <label>이미지</label>
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="input-group">
              <label>내용</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="본문 내용을 입력해 주세요" required />
            </div>
          </div>

        <div className="separator"></div>

          <div className="right-section">
            <div className="input-group">
              <label>태그</label>
              <input
                type="text"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagKeyDown}
                placeholder="태그 입력 후 Enter"
              />
              {/* 태그 목록 */}
              <div className="tag-container">
                {tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag} <button className="remove-tag" onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            </div>
            <div className="input-group">
              <label>장소</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="장소를 입력해 주세요" />
            </div>
            <div className="input-group">
              <label>추억의 순간</label>
              <input type="date" value={moment} onChange={(e) => setMoment(e.target.value)} />
            </div>
            <div className="input-group toggle-group">
              <label>공개 여부</label>
              <label className="switch">
                <input type="checkbox" checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
                <span className="slider"></span>
              </label>
              <span>{isPublic ? "공개" : "비공개"}</span>
            </div>
            <div className="input-group">
              <label>비밀번호</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력해 주세요" required />
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">올리기</button>
      </form>
    </div>
  );
};

export default MemoryCreatePage;
