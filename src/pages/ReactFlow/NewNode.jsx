import { useState, useContext } from 'react';
import { Handle } from '@xyflow/react';
import NodeFLowList from './ContentList/NodeFLowList';
import { CiText } from "react-icons/ci";
import { IoEyeOutline, IoPlay, IoPlayOutline, IoFingerPrintSharp } from "react-icons/io5";
import { RiDeleteBin6Line, RiLink } from "react-icons/ri";
import { GoCopy } from "react-icons/go";
import { IoChatbubbleEllipsesOutline, IoLogoWhatsapp } from "react-icons/io5";
import { FaConnectdevelop } from "react-icons/fa";
import '../../assets/style/NewNode.css';
import { ContentContext } from '../../context/ContextProvider';

const NewNode = ({ id, data, isConnectable, onDelete, onDuplicate, onRenameClick, nodeNumber }) => {
  const { getContentForNode, startNodeId, setStartNodeId, setContentForNode } = useContext(ContentContext);
  const [isHovered, setIsHovered] = useState(false);
  const contentItems = getContentForNode(id);
  const isStartNode = id === startNodeId;
  const quickReplies = contentItems.find(item => item.type === 'quickReply')?.items || [];

  const nodeChannels = JSON.parse(localStorage.getItem('nodeChannels')) || {};
  const channel = nodeChannels[id] || 'omnichannel';

  const getChannelInitial = () => {
    switch (channel) {
      case 'whatsapp': return <IoLogoWhatsapp fontSize={23} color='green' />;
      case 'webchat': return <IoChatbubbleEllipsesOutline fontSize={23} />;
      default: return <FaConnectdevelop fontSize={23} />;
    }
  };

  const handleAddContent = (index, type) => {
    const currentContent = [...getContentForNode(id)];

    // For View Catalog/WhatsAppFlows types, add a new button
    if (type === 'View Catalog' || type === 'ViewCatalog' || type === 'WhatsAppFlows') {
      const newButton = {
        type: 'button',
        text: type === 'View Catalog' ? 'Catalog Item' :
          type === 'ViewCatalog' ? 'View Catalog' : 'Button',
        action: 'postback'
      };

      if (!currentContent[index].buttons) {
        currentContent[index].buttons = [];
      }

      currentContent[index].buttons.push(newButton);
      setContentForNode(id, currentContent);
    }
    // For other types that might need additional content
    else {
      const newContent = {
        type: type,
        value: '',
        ...(type === 'Card' || type === 'Crousel' ? { title: '', subtitle: '' } : {})
      };

      currentContent.splice(index + 1, 0, newContent);
      setContentForNode(id, currentContent);
    }
  };

  return (
    <div className='node-box'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {data.isStart && (
        <div className='start-bot'>
          <div className="play-icon">
            <IoPlay />
          </div>
          <span>Start</span>
        </div>
      )}

      <div className='icon-toolbar' style={{
        display: isHovered ? 'flex' : 'none',
        flexDirection: 'row', gap: '8px',
      }}>
        <i className="icon-eye" onClick={(e) => e.stopPropagation()}><IoEyeOutline /></i>
        {!data.isStart && (
          <i className="icon-eye" onClick={(e) => { e.stopPropagation(); setStartNodeId(id); }}>
            <IoPlayOutline />
          </i>
        )}
        <i className="icon-eye" onClick={(e) => e.stopPropagation()}><RiLink /></i>
        <i className="icon-eye" onClick={(e) => e.stopPropagation()}><IoFingerPrintSharp /></i>
        <i className="icon-eye" onClick={(e) => { e.stopPropagation(); onRenameClick(id, data.label); }}><CiText /></i>
        {!data.isStart && (
          <i className="icon-delete" onClick={(e) => { e.stopPropagation(); onDelete(id); }}>
            <RiDeleteBin6Line />
          </i>
        )}
        <i className="icon-eye" onClick={(e) => { e.stopPropagation(); onDuplicate(id) }}><GoCopy /></i>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{
          marginLeft: '5px',
          padding: '2px 6px',
          borderRadius: '50%',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {getChannelInitial()}
        </span>
        <span>Message #{nodeNumber}</span>
      </div>

      {isStartNode ? (
        <div className="start-node-content">
          <div className="first-node-target">
            <div className='custom-continue-text'>Continue</div>
            <Handle
              className='custom-continue-handler'
              type="source"
              id="handle-continue"
              position="right"
              isConnectable={isConnectable}
            />
          </div>
        </div>
      ) : (
        <>
          {contentItems
            .filter(item => item.type !== 'quickReply')
            .map((item, index) => (
              <div key={index} className="node-content-item">
                <NodeFLowList
                  item={item}
                  index={index}
                  nodeId={id}
                  handleAddContent={handleAddContent}
                />
              </div>
            ))}

          {quickReplies.length > 0 && (
            <div className="node-quick-replies">
              {quickReplies.map((reply) => (
                <div key={reply.id} className="node-quick-reply-item">
                  <button className="node-quick-reply-btn">
                    {reply.text}
                    <Handle
                      className='quick-reply-handler'
                      type="source"
                      id={`handle-${reply.id}`}
                      position="right"
                      isConnectable={isConnectable}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className='dynamic-continue-text'>
            Continue
            <Handle className='dynamic-continue-handler'
              type="source"
              position="right"
              isConnectable={isConnectable}
            />
          </div>
        </>
      )}

      <Handle className='dynamic-target-handler'
        type="target"
        position="left"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default NewNode;