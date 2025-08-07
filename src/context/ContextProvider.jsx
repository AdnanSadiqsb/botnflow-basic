import { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import logo from '../assets/images/logo.png'
import useAxios from '../utils/useAxios';
import getToken from '../utils/GetToken';
export const ContentContext = createContext();

export const ContextProvider = ({ children }) => {
  const [nodeContents, setNodeContents] = useState({});
  const [currentFlowId, setCurrentFlowId] = useState(null);
  const [role, setRole] = useState('');
  const [logoImage, setLogoImage] = useState(logo)
  const [themeColor, setThemeColor] = useState('#0076cb');
  const [secondaryThemeColor, setSecondaryThemeColor] = useState('#1e3a8a');
  const [customizationModal, setCustomizationModal] = useState(false);
  const [userInfo, setUserInfo] = useState([])
  const [companyInfo, setCompanyInfo] = useState({})
  const token = getToken();
  const saveContentToServer = useCallback(async (nodeId, content) => {
    if (!currentFlowId) return;

    try {
      await axios.post(`http://localhost:5001/api/save-content/${currentFlowId}`, {
        nodeId,
        content
      });
    } catch (error) {
      console.error('Error saving content:', error);
    }
  }, [currentFlowId]);

      const getUserInfo = async () => {
      try {
        const [responseData, fetchError] = await useAxios('GET', 'users', token);
        if (responseData) {
          setUserInfo(responseData.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

  const setContentForNode = useCallback((nodeId, contentItems) => {
    const processedContent = contentItems.map(item => {
      if (item.value instanceof File) {
        return {
          ...item,
          value: {
            name: item.value.name,
            type: item.value.type,
            size: item.value.size,
            lastModified: item.value.lastModified,
            isFile: true
          }
        };
      }
      return item;
    });

    setNodeContents(prev => ({
      ...prev,
      [nodeId]: processedContent
    }));

    saveContentToServer(nodeId, processedContent);
  }, [saveContentToServer]);

  const getContentForNode = (nodeId) => {
    return nodeContents[nodeId] || [];
  };

  return (
    <ContentContext.Provider value={{
      getContentForNode,
      setContentForNode,
      currentFlowId,
      setCurrentFlowId,
      nodeContents,
      role,
      setRole,
      logoImage,
      setLogoImage,
      themeColor,
      setThemeColor,
      secondaryThemeColor,
      setSecondaryThemeColor,
      customizationModal,
      setCustomizationModal,
      userInfo,
      setUserInfo,
      getUserInfo
    }}>
      {children}
    </ContentContext.Provider>
  );
};