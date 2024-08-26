import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";  // 이 부분은 변경하지 않았습니다.
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        console.log("Initial isAuthenticated:", authStatus); // 초기 인증 상태 로그
        return authStatus;
    });

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        console.log("Loaded user from localStorage:", savedUser); // 로컬 스토리지에서 불러온 user 로그
        if (savedUser && savedUser !== "undefined") {
            try {
                const parsedUser = JSON.parse(savedUser);
                console.log("Parsed user:", parsedUser); // 파싱된 user 로그
                return parsedUser;
            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        } else {
            console.log("No valid user data found in localStorage.");
        }
        return null;
    });

    const login = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            console.log("Decoded token on login:", decodedToken); // 디코딩된 토큰 로그

            // decodedToken에서 fullName을 가져오기
            let fullName = decodedToken.fullName || "";
            if (fullName.startsWith("null ")) {
                fullName = fullName.replace("null ", "").trim();
            }

            const userWithFullName = {
                ...decodedToken,  // decodedToken의 모든 값을 복사
                fullName: fullName || "",  // fullName을 덮어쓰기
            };

            console.log("Final user object after login processing:", userWithFullName); // 최종 user 객체 로그

            setUser(userWithFullName);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("user", JSON.stringify(userWithFullName));
            navigate("/home");
        } catch (error) {
            console.error("Error during login:", error); // 로그인 중 오류 발생 시 로그
        }
    };

    const logout = () => {
        console.log("Logging out user:", user);
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        console.log("AuthProvider rendered with user:", user);
    }, [user]);

    const value = { isAuthenticated, login, logout, user };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;