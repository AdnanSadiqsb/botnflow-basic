// import React, { useState } from 'react';
// import { CiImageOn } from 'react-icons/ci';
// import { BsCart3 } from "react-icons/bs";
// import { FaMapLocation } from "react-icons/fa6";
// import { MdVideoCall } from "react-icons/md";
// import { RxSpeakerLoud } from "react-icons/rx";
// import { GrAttachment } from "react-icons/gr";


// const ModalContentList = ({ item, index, handleInputChange, handleAddContent }) => {
//   const [buttons, setButtons] = useState([]);

//   const [cardButtons, setCardButtons] = useState([]);
//   const [uploadedImage, setUploadedImage] = useState(null);

//   const handleAddCardButton = () => {
//     setCardButtons((prev) => [...prev, `Button ${prev.length + 1}`]);
//   };

//   const handleAddButton = () => {
//     setButtons((prevButtons) => [...prevButtons, `Button ${prevButtons.length + 1}`]);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setUploadedImage(imageUrl);
//       handleInputChange(index, file);
//     }
//   };

//   switch (item.type) {
//     case 'WhatsApp Flows':
//     case 'Text':
//     case 'Inbox':
//       return (
//         <div style={{ width: "83%", textAlign: 'center', minHeight: "130px", backgroundColor: "#F2F4F5", borderRadius: "13px", margin: "20px auto", overflow: "hidden", paddingBottom: '10px' }}>
//           <input
//             type="text"
//             placeholder="Enter text here"
//             style={{ backgroundColor: "#E3E6EB", padding: "20px 5px", width: "100%", border: "none", outline: "none" }}
//           />

//           {/* Render all buttons */}
//           {buttons.map((button, btnIndex) => (
//             <button
//               key={btnIndex}
//               style={{
//                 width: "80%",
//                 padding: "11px",
//                 margin: "10px auto",
//                 border: "none",
//                 borderRadius: "4px",
//                 backgroundColor: "#E3E6E7",
//                 display: "block"
//               }}
//             >
//               {button}
//             </button>
//           ))}

//           {/* Add Button */}
//           <button
//             style={{
//               width: "80%",
//               padding: "11px",
//               margin: "10px auto",
//               border: "none",
//               borderRadius: "4px",
//               backgroundColor: "#E3E6E7",
//               display: "block"
//             }}
//             onClick={handleAddButton}
//           >
//             + Add Button
//           </button>
//         </div>
//       );

//     // case 'Image':
//     //   return (
//     //     <div style={{
//     //       borderRadius: "8px", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "200px", width: "82%", backgroundColor: "#f5f5f5", cursor: "pointer", border: "1px dashed lightgray", margin: "20px auto", position: 'relative'
//     //     }}>
//     //       {uploadedImage ? (
//     //         <img
//     //           src={uploadedImage}
//     //           alt="Uploaded"
//     //           style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }}
//     //         />
//     //       ) : (
//     //         <>
//     //           <input
//     //             type="file"
//     //             accept="image/*"
//     //             onChange={handleImageChange}
//     //             style={{
//     //               opacity: 0, position: "absolute", top: 0, left: 0, height: "100%", width: "100%", cursor: "pointer"
//     //             }}
//     //           />
//     //           <div style={{ textAlign: "center", pointerEvents: "none" }}>
//     //             <CiImageOn style={{ fontSize: "31px", marginBottom: "28px" }} />
//     //             <div><a href="#">Upload Image</a></div>
//     //           </div>
//     //         </>
//     //       )}
//     //     </div>
//     //   );

//     case 'Crousel':
//     case 'Card':
//       return (
//         <div style={{
//           border: "1px dashed gray",
//           borderRadius: "8px",
//           textAlign: "center",
//           height: "250px",
//           width: "80%",
//           boxSizing: "border-box",
//           backgroundColor: "#fff",
//           cursor: "pointer",
//           margin: "30px auto",
//           overflow: "hidden",
//           marginTop: "10px",
//           position: "relative"
//         }}>
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               height: "50%",
//               width: "100%",
//               cursor: "pointer"
//             }}
//             onClick={() => document.getElementById(`file-input-${index}`).click()}
//           >
//             <CiImageOn style={{ margin: "18px 0px", fontSize: "31px" }} />
//             <div><a href="#">Upload Image</a></div>
//           </div>
//           <input
//             type="file"
//             id={`file-input-${index}`}
//             onChange={(e) => handleInputChange(index, e.target.files[0])}
//             style={{
//               opacity: 0,
//               position: "absolute",
//               top: 0,
//               left: 0,
//               height: "100%",
//               width: "100%",
//               cursor: "pointer"
//             }}
//           />
//           <div style={{
//             textAlign: "center",
//             pointerEvents: "none",
//             backgroundColor: "#F2F4F5",
//             position: "absolute",
//             bottom: 0,
//             width: "100%",
//             padding: "10px 0"
//           }}>
//             <div style={{ width: "100%" }}>
//               <input type="text" placeholder="Title (Required)" style={{
//                 width: "100%",
//                 padding: "5px",
//                 marginBottom: "2px",
//                 boxSizing: "border-box",
//                 backgroundColor: "transparent",
//                 outline: "none",
//                 border: "none",
//                 fontSize: "13px",
//                 pointerEvents: "auto"
//               }} />
//               <input type="text" placeholder="Subtitle" style={{
//                 width: "100%",
//                 padding: "5px",
//                 boxSizing: "border-box",
//                 backgroundColor: "transparent",
//                 outline: "none",
//                 border: "none",
//                 fontSize: "13px",
//                 pointerEvents: "auto"
//               }} />

//               {/* Render all card buttons */}
//               {cardButtons.map((button, btnIndex) => (
//                 <button
//                   key={btnIndex}
//                   style={{
//                     margin: "10px auto",
//                     padding: "8px 16px",
//                     backgroundColor: "#E4E6E7",
//                     color: "black",
//                     borderRadius: "4px",
//                     border: "none",
//                     cursor: "pointer",
//                     pointerEvents: "auto",
//                     display: "block",
//                     width: "90%"
//                   }}
//                 >
//                   {button}
//                 </button>
//               ))}
//             </div>

//             {/* Add Button for card */}
//             <button
//               onClick={handleAddCardButton}
//               style={{
//                 margin: "10px auto",
//                 padding: "8px 16px",
//                 backgroundColor: "#E4E6E7",
//                 color: "black",
//                 borderRadius: "4px",
//                 border: "none",
//                 cursor: "pointer",
//                 pointerEvents: "auto",
//                 display: "block",
//                 width: "90%"
//               }}
//             >
//               + Add Button
//             </button>
//           </div>
//         </div>
//       );

//     case 'Get User Data':
//       return (
//         <div>
//           <div style={{ width: "83%", minHeight: "50px", backgroundColor: "#F2F4F5", borderRadius: "13px", margin: "20px auto", overflow: "hidden" }}>
//             <input
//               type="text"
//               value={item.value}
//               onChange={(e) => handleInputChange(index, e.target.value)}
//               placeholder="Enter text here"
//               style={{ backgroundColor: "#E3E6EB", padding: "20px 5px", width: "100%", border: "none", outline: "none" }}
//             />
//           </div>
//           <button style={{ width: "60px", padding: "8px", margin: "0px 130px", borderRadius: "23px", border: "1px solid gray" }}>Edit</button>
//         </div>
//       );

//     case 'Image':
//     case 'Audio':
//     case 'Video': {
//       const isImage = item.type === 'Image';
//       const isVideo = item.type === 'Video';
//       return (
//         <div
//           style={{
//             border: "1px dashed lightgray",
//             borderRadius: "8px",
//             padding: "16px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             minHeight: "200px",
//             width: "82%",
//             backgroundColor: "#f5f5f5",
//             cursor: "pointer",
//             margin: "20px auto",
//             position: "relative",
//           }}
//         >
//           {/* === Image uploaded preview === */}
//           {isImage && uploadedImage ? (
//             <img
//               src={uploadedImage}
//               alt="Uploaded"
//               style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }}
//             />
//           ) : (
//             <>
//               <input
//                 type="file"
//                 accept={
//                   isImage ? "image/*" : isVideo ? "video/*" : "audio/*"
//                 }
//                 onChange={(e) => {
//                   if (isImage) {
//                     handleImageChange(e);
//                   } else {
//                     handleInputChange(index, e.target.files[0]);
//                   }
//                 }}
//                 style={{
//                   opacity: 0,
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   height: "100%",
//                   width: "100%",
//                   cursor: "pointer",
//                 }}
//               />

//               <div style={{ textAlign: "center", pointerEvents: "none" }}>
//                 {isImage ? (
//                   <CiImageOn style={{ fontSize: "31px", marginBottom: "28px", color: "gray" }} />
//                 ) : isVideo ? (
//                   <MdVideoCall style={{ fontSize: "47px", marginBottom: "15px", color: "gray" }} />
//                 ) : (
//                   <RxSpeakerLoud style={{ fontSize: "27px", marginBottom: "15px", color: "gray" }} />
//                 )}
//                 <div><a href="#">Upload {item.type}</a></div>
//               </div>
//             </>
//           )}
//         </div>
//       );
//     }

//     case 'File':
//       return (
//         <div style={{ width: "83%", minHeight: "140px", backgroundColor: "#F2F4F5", borderRadius: "13px", margin: "20px auto", overflow: "hidden", paddingBottom: "10px" }}>
//           <input
//             type="file"
//             accept="file/*"
//             value={item.value}
//             onChange={(e) => handleInputChange(index, e.target.value)}
//             placeholder="Enter text here"
//             style={{ backgroundColor: "#E3E6EB", padding: "20px 5px", width: "100%", border: "none" }}
//           />

//           {/* Render all buttons */}
//           {buttons.map((button, btnIndex) => (
//             <button
//               key={btnIndex}
//               style={{
//                 width: "80%",
//                 padding: "11px",
//                 margin: "10px auto",
//                 border: "none",
//                 borderRadius: "4px",
//                 backgroundColor: "#E3E6E7",
//                 display: "block"
//               }}
//             >
//               {button}
//             </button>
//           ))}

//           {/* Add Button */}
//           <button
//             style={{
//               width: "80%",
//               padding: "11px",
//               margin: "10px auto",
//               border: "none",
//               borderRadius: "4px",
//               backgroundColor: "#E3E6E7",
//               display: "block"
//             }}
//             onClick={handleAddButton}
//           >
//             + Add Button
//           </button>
//         </div>
//       );

//     case 'Options List':
//     case 'Template Message Pro':
//     case 'Typing Pro':
//     case 'Actions':
//     case 'View Catalog':
//     case 'ViewCatalog':
//     case 'WhatsAppFlows': {
//       const isViewCatalogWithSpace = item.type === 'View Catalog';
//       const isViewCatalogNoSpace = item.type === 'ViewCatalog';
//       const isWhatsAppFlows = item.type === 'WhatsAppFlows';

//       const width = "83%";
//       const buttonText = isViewCatalogWithSpace
//         ? "+ Add Catalog"
//         : isViewCatalogNoSpace
//           ? "View Catalog"
//           : "button # 1";

//       return (
//         <div
//           style={{
//             width,
//             textAlign: "center",
//             minHeight: "130px",
//             backgroundColor: "#F2F4F5",
//             borderRadius: "13px",
//             margin: "20px auto",
//             overflow: "hidden",
//             paddingBottom: "10px",
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Enter text here"
//             style={{
//               backgroundColor: "#E3E6EB",
//               padding: "20px 5px",
//               width: "100%",
//               border: "none",
//               outline: "none",
//             }}
//             value={item.value || ''}
//             onChange={(e) => handleInputChange(index, e.target.value)}
//           />

//           <button
//             style={{
//               width: "80%",
//               padding: "11px",
//               margin: "10px auto",
//               border: "none",
//               borderRadius: "4px",
//               backgroundColor: "#E3E6E7",
//               display: "block",
//             }}
//             onClick={() => handleAddContent(index, item.type)}
//           >
//             {buttonText}
//           </button>
//         </div>
//       );
//     }

//     case 'Send Products':
//       return (
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70px", gap: "10px" }}>
//           <BsCart3 style={{ color: "darkorange" }} />
//           <span>Send Products</span>
//         </div>
//       );

//     case 'Location':
//       return (
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70px", gap: "10px" }}>
//           <FaMapLocation style={{ color: "darkorange" }} />
//           <span>Location</span>
//         </div>
//       );

//     // file nested list 
//     case 'Others':
//       return (
//         <div style={{
//           borderRadius: "8px",
//           padding: "16px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "150px",
//           width: "82%",
//           backgroundColor: "#f5f5f5",
//           cursor: "pointer",
//           border: "1px dashed lightgray",
//           margin: "20px auto",
//           position: "relative"
//         }}>
//           <input
//             type="file"
//             accept="image/*,video/*,audio/*,application/pdf"
//             onChange={(e) => handleInputChange(index, e.target.files[0])}
//             style={{
//               opacity: 0,
//               position: "absolute",
//               top: 0,
//               left: 0,
//               height: "100%",
//               width: "100%",
//               cursor: "pointer"
//             }}
//           />
//           <div style={{ textAlign: "center", pointerEvents: "none" }}>
//             <GrAttachment style={{ fontSize: "30px", marginBottom: "12px", color: "lightgray" }} />
//             <div><a href="#">Upload File</a></div>
//           </div>
//         </div>
//       );

//     default:
//       return null;
//   }
// };

// export default ModalContentList;












// ModalContentList.js
import React, { useState } from 'react';
import { CiImageOn } from 'react-icons/ci';
import { BsCart3 } from "react-icons/bs";
import { FaMapLocation } from "react-icons/fa6";
import { MdVideoCall } from "react-icons/md";
import { RxSpeakerLoud } from "react-icons/rx";
import { GrAttachment } from "react-icons/gr";

const ModalContentList = ({ item, index, handleInputChange, handleAddContent }) => {
  const [buttons, setButtons] = useState([]);
  const [cardButtons, setCardButtons] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleAddCardButton = () => {
    setCardButtons((prev) => [...prev, `Button ${prev.length + 1}`]);
  };

  const handleAddButton = () => {
    setButtons((prevButtons) => [...prevButtons, `Button ${prevButtons.length + 1}`]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      handleInputChange(index, file);
    }
  };

  const renderImagePreview = (file) => {
    if (!file) return null;

    if (typeof file === 'string') {
      return (
        <img
          src={file}
          alt="Uploaded"
          style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }}
        />
      );
    } else if (file instanceof File || file instanceof Blob) {
      const url = URL.createObjectURL(file);
      return (
        <img
          src={url}
          alt="Uploaded"
          style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }}
        />
      );
    }
    return null;
  };

  switch (item.type) {
    case 'WhatsApp Flows':
    case 'Text':
    case 'Inbox':
      return (
        <div style={{ width: "83%", textAlign: 'center', minHeight: "130px", backgroundColor: "#F2F4F5", borderRadius: "13px", margin: "20px auto", overflow: "hidden", paddingBottom: '10px' }}>
          <input
            type="text"
            value={item.value || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="Enter text here"
            style={{ backgroundColor: "#E3E6EB", padding: "20px 5px", width: "100%", border: "none", outline: "none" }}
          />

          {buttons.map((button, btnIndex) => (
            <button
              key={btnIndex}
              style={{
                width: "80%",
                padding: "11px",
                margin: "10px auto",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#E3E6E7",
                display: "block"
              }}
            >
              {button}
            </button>
          ))}

          <button
            style={{
              width: "80%",
              padding: "11px",
              margin: "10px auto",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#E3E6E7",
              display: "block"
            }}
            onClick={handleAddButton}
          >
            + Add Button
          </button>
        </div>
      );

    case 'Image':
    case 'Audio':
    case 'Video': {
      const isImage = item.type === 'Image';
      const isVideo = item.type === 'Video';
      return (
        <div
          style={{
            border: "1px dashed lightgray",
            borderRadius: "8px",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "200px",
            width: "82%",
            backgroundColor: "#f5f5f5",
            cursor: "pointer",
            margin: "20px auto",
            position: "relative",
          }}
        >
          {item.value ? (
            renderImagePreview(item.value)
          ) : (
            <>
              <input
                type="file"
                accept={isImage ? "image/*" : isVideo ? "video/*" : "audio/*"}
                onChange={(e) => {
                  if (isImage) {
                    handleImageChange(e);
                  } else {
                    handleInputChange(index, e.target.files[0]);
                  }
                }}
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  cursor: "pointer",
                }}
              />

              <div style={{ textAlign: "center", pointerEvents: "none" }}>
                {isImage ? (
                  <CiImageOn style={{ fontSize: "31px", marginBottom: "28px", color: "gray" }} />
                ) : isVideo ? (
                  <MdVideoCall style={{ fontSize: "47px", marginBottom: "15px", color: "gray" }} />
                ) : (
                  <RxSpeakerLoud style={{ fontSize: "27px", marginBottom: "15px", color: "gray" }} />
                )}
                <div><a href="#">Upload {item.type}</a></div>
              </div>
            </>
          )}
        </div>
      );
    }

    case 'Crousel':
    case 'Card':
      return (
        <div style={{
          border: "1px dashed gray",
          borderRadius: "8px",
          textAlign: "center",
          height: "250px",
          width: "80%",
          boxSizing: "border-box",
          backgroundColor: "#fff",
          cursor: "pointer",
          margin: "30px auto",
          overflow: "hidden",
          marginTop: "10px",
          position: "relative"
        }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "50%",
              width: "100%",
              cursor: "pointer",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => document.getElementById(`file-input-${index}`).click()}
          >
            {item.value ? (
              renderImagePreview(item.value)
            ) : (
              <>
                <CiImageOn style={{ margin: "18px 0px", fontSize: "31px" }} />
                <div><a href="#">Upload Image</a></div>
              </>
            )}
          </div>
          <input
            type="file"
            id={`file-input-${index}`}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                handleInputChange(index, file);
              }
            }}
            style={{
              opacity: 0,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              cursor: "pointer"
            }}
          />
          <div style={{
            textAlign: "center",
            backgroundColor: "#F2F4F5",
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "10px 0"
          }}>
            <div style={{ width: "100%" }}>
              <input
                type="text"
                placeholder="Title (Required)"
                value={item.title || ''}
                onChange={(e) => {
                  const updatedItem = { ...item, title: e.target.value };
                  handleInputChange(index, updatedItem);
                }}
                style={{
                  width: "100%",
                  padding: "5px",
                  marginBottom: "2px",
                  boxSizing: "border-box",
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "none",
                  fontSize: "13px",
                }}
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={item.subtitle || ''}
                onChange={(e) => {
                  const updatedItem = { ...item, subtitle: e.target.value };
                  handleInputChange(index, updatedItem);
                }}
                style={{
                  width: "100%",
                  padding: "5px",
                  boxSizing: "border-box",
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "none",
                  fontSize: "13px",
                }}
              />

              {cardButtons.map((button, btnIndex) => (
                <button
                  key={btnIndex}
                  style={{
                    margin: "10px auto",
                    padding: "8px 16px",
                    backgroundColor: "#E4E6E7",
                    color: "black",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    display: "block",
                    width: "90%"
                  }}
                >
                  {button}
                </button>
              ))}
            </div>

            <button
              onClick={handleAddCardButton}
              style={{
                margin: "10px auto",
                padding: "8px 16px",
                backgroundColor: "#E4E6E7",
                color: "black",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                display: "block",
                width: "90%"
              }}
            >
              + Add Button
            </button>
          </div>
        </div>
      );

    case 'Get User Data':
      return (
        <div>
          <div style={{ width: "83%", minHeight: "50px", backgroundColor: "#F2F4F5", borderRadius: "13px", margin: "20px auto", overflow: "hidden" }}>
            <input
              type="text"
              value={item.value || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="Enter text here"
              style={{ backgroundColor: "#E3E6EB", padding: "20px 5px", width: "100%", border: "none", outline: "none" }}
            />
          </div>
          <button style={{ width: "60px", padding: "8px", margin: "0px 130px", borderRadius: "23px", border: "1px solid gray" }}>Edit</button>
        </div>
      );

    case 'File':
      return (
        <div style={{ width: "83%", minHeight: "140px", backgroundColor: "#F2F4F5", borderRadius: "13px", margin: "20px auto", overflow: "hidden", paddingBottom: "10px" }}>
          <div style={{
            backgroundColor: "#E3E6EB",
            padding: "20px 5px",
            width: "100%",
            border: "none",
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {item.value ? (
              <div style={{ textAlign: 'center' }}>
                <GrAttachment style={{ fontSize: "30px", marginBottom: "12px", color: "gray" }} />
                <div>{item.value.name || 'Uploaded File'}</div>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  onChange={(e) => handleInputChange(index, e.target.files[0])}
                  style={{
                    opacity: 0,
                    position: "absolute",
                    left: 0,
                    height: "60px",
                    width: "83%",
                    cursor: "pointer"
                  }}
                />
                <div style={{ textAlign: 'center' }}>
                  <GrAttachment style={{ fontSize: "30px", marginBottom: "12px", color: "gray" }} />
                  <div>Upload File</div>
                </div>
              </>
            )}
          </div>

          {buttons.map((button, btnIndex) => (
            <button
              key={btnIndex}
              style={{
                width: "80%",
                padding: "11px",
                margin: "10px auto",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#E3E6E7",
                display: "block"
              }}
            >
              {button}
            </button>
          ))}

          <button
            style={{
              width: "80%",
              padding: "11px",
              margin: "10px auto",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#E3E6E7",
              display: "block"
            }}
            onClick={handleAddButton}
          >
            + Add Button
          </button>
        </div>
      );

    case 'Options List':
    case 'Template Message Pro':
    case 'Typing Pro':
    case 'Actions':
    case 'View Catalog':
    case 'ViewCatalog':
    case 'WhatsAppFlows': {
      const isViewCatalogWithSpace = item.type === 'View Catalog';
      const isViewCatalogNoSpace = item.type === 'ViewCatalog';
      const isWhatsAppFlows = item.type === 'WhatsAppFlows';

      const width = "83%";
      const buttonText = isViewCatalogWithSpace
        ? "+ Add Catalog"
        : isViewCatalogNoSpace
          ? "View Catalog"
          : "button # 1";

      return (
        <div
          style={{
            width,
            textAlign: "center",
            minHeight: "130px",
            backgroundColor: "#F2F4F5",
            borderRadius: "13px",
            margin: "20px auto",
            overflow: "hidden",
            paddingBottom: "10px",
          }}
        >
          <input
            type="text"
            value={item.value || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="Enter text here"
            style={{
              backgroundColor: "#E3E6EB",
              padding: "20px 5px",
              width: "100%",
              border: "none",
              outline: "none",
            }}
          />

          <button
            style={{
              width: "80%",
              padding: "11px",
              margin: "10px auto",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#E3E6E7",
              display: "block",
            }}
            onClick={() => handleAddContent(index, item.type)}
          >
            {buttonText}
          </button>
        </div>
      );
    }

    case 'Send Products':
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70px", gap: "10px" }}>
          <BsCart3 style={{ color: "darkorange" }} />
          <span>Send Products</span>
        </div>
      );

    case 'Location':
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70px", gap: "10px" }}>
          <FaMapLocation style={{ color: "darkorange" }} />
          <span>Location</span>
        </div>
      );

    case 'Others':
      return (
        <div style={{
          borderRadius: "8px",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "150px",
          width: "82%",
          backgroundColor: "#f5f5f5",
          cursor: "pointer",
          border: "1px dashed lightgray",
          margin: "20px auto",
          position: "relative"
        }}>
          <input
            type="file"
            accept="image/*,video/*,audio/*,application/pdf"
            onChange={(e) => handleInputChange(index, e.target.files[0])}
            style={{
              opacity: 0,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              cursor: "pointer"
            }}
          />
          <div style={{ textAlign: "center", pointerEvents: "none" }}>
            <GrAttachment style={{ fontSize: "30px", marginBottom: "12px", color: "lightgray" }} />
            <div><a href="#">Upload File</a></div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default ModalContentList;