import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Nav from "../components/Nav";
import PublicGroupItem from "../components/PublicGroupItem";
import PrivateGroupItem from "../components/PrivateGroupItem";
import Footer from "../components/Footer";
import mockData from "../api/mock.json";
import styles from "./PublicGroupListPage.module.css";
import noteIcon from "../assets/note-icon.svg"; // 아이콘 파일 import
import { getGroups } from "../api/groupApi";

const PublicGroupListPage = () => {
    const [groups, setGroups] = useState([]);
    const [selectedTab, setSelectedTab] = useState("public");
    const [loading, setLoading] =useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const data = await getGroups();
                setGroups(data);
            } catch (error) {
                console.error("공개 그룹 목록을 불러오는 중 오류 발생:", error);
            }
        };

        fetchGroups();
    }, []);
/*          fetch("/mock.json")
          .then((response) => response.json())
          .then((data) => setGroups(data || [])) // 🔹 undefined일 경우 빈 배열로 설정
          .catch((error) => console.error("데이터를 불러오는 중 오류 발생", error));
  }, []);
*/
    const filteredGroups = (mockData || []).filter(group => 
        selectedTab === "public" ? group.privacy === "공개" : group.privacy === "비공개"
    );

    return (
        <div className={styles.page}>
            <Nav showTabs={true} showSearch={true} showCreateButton={true} showSortDropDown={true} setSelectedTab={setSelectedTab} />

            <div className={styles.groupList}>
                {filteredGroups.length > 0 ? (
                    filteredGroups.map(group => (
                        selectedTab === "public" ? (
                            <PublicGroupItem key={group.id} group={group} />
                        ) : (
                            <PrivateGroupItem key={group.id} group={group} />
                        )
                    ))
            ) : (
                <div className={styles.noGroupsContainer}>
                    <img src={noteIcon} alt="No Groups Icon" className={styles.noGroupsIcon} />
                    <p className={styles.noGroupsText}>등록된 그룹이 없습니다.</p>
                    <p className={styles.createPrompt}>가장 먼저 그룹을 만들어보세요!</p>
                    <Link to="/group/create" className={styles.createButton}>그룹 만들기</Link>
                </div>
            )}
            </div>
        </div>
    );
};

export default PublicGroupListPage;