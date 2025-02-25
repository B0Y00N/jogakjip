import React from "react";
import notFoundImg from "../assets/notFound.svg";
import "./NotFoundPage.css";

const NotFoundPage = () => {
    return (
        <div className="not-found">
            <img src={notFoundImg} alt="not found" />
            <h2>찾을 수 없는 페이지입니다.</h2>
            <p>요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.</p>
        </div>
    )
};

export default NotFoundPage;