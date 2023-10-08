import React, { useEffect, useState } from "react";
import "./App.css";
import { FcOpenedFolder } from "react-icons/fc";

function App() {
  const [images, setImages] = useState([
    "./image1.jpg",
    "./image2.jpeg",
    "./image1.jpg",
    "./image2.jpeg",
    "./image1.jpg",
    "./image2.jpeg",
    "./image1.jpg",
    "./image2.jpeg",
    "./image1.jpg",
  ]);

  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [draggedImage, setDraggedImage] = useState(null);
  const [targetFolder, setTargetFolder] = useState(null);

  const createFolder = (folderName) => {
    setFolders([
      ...folders,
      { name: folderName, images: [], isHovered: false },
    ]);
  };

  const handleImageDrop = (imageURL, folderName) => {
    if (draggedImage && targetFolder) {
      const updatedFolders = folders.map((folder) =>
        folder.name === folderName
          ? {
              ...folder,
              images: [...folder.images, draggedImage],
              isHovered: false,
            }
          : folder
      );
      setFolders(updatedFolders);
      setDraggedImage(null);
      setTargetFolder(null);
    }
  };

  const handleFolderDoubleClick = (folderName) => {
    setSelectedFolder(folderName);
  };

  const handleImageDragOver = (e, folderName) => {
    e.preventDefault();
    setTargetFolder(folderName);
  };

  const handleFolder = () => {
    const folder = prompt("Enter Folder Name");
    if (folder) {
      createFolder(folder);
    }
  };

  const handleDragStart = (imageURL) => {
    setDraggedImage(imageURL);
  };

  return (
    <div className="app">
      <div className="section">
        <h2>Images</h2>
        <div className="image-section">
          {images.map((imageURL, index) => (
            <img
              key={index}
              src={imageURL}
              alt={`Image ${index + 1}`}
              draggable
              onDragStart={() => handleDragStart(imageURL)}
            />
          ))}
        </div>
      </div>
      <div className="border"></div>
      {
        <div className="section">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <h2>Folders</h2>
            <button onClick={handleFolder}>Create Folder</button>
          </div>
          <div className="folder-section">
            {selectedFolder ? (
              selectedFolder && (
                <>
                  <h3 style={{ color: "#007BFF" }}>
                    <span
                      className="selected_folder_span"
                      onClick={() => setSelectedFolder(null)}
                    >
                      Folders
                    </span>{" "}
                    / {selectedFolder}
                  </h3>
                  <div className="image-section">
                    {folders
                      .find((folder) => folder.name === selectedFolder)
                      ?.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Image ${index + 1}`}
                        />
                      ))}
                  </div>
                </>
              )
            ) : (
              <div className="folder-row">
                {folders.map((folder, index) => (
                  <div
                    key={index}
                    className={`${folder.isHovered ? "hovered-folder" : ""}`}
                    onDoubleClick={() => handleFolderDoubleClick(folder.name)}
                    onDragOver={(e) => handleImageDragOver(e, folder.name)}
                    onDrop={() => handleImageDrop(draggedImage, folder.name)}
                    onDragEnter={() => {
                      const updatedFolders = [...folders];
                      updatedFolders[index].isHovered = true;
                      setFolders(updatedFolders);
                    }}
                    onDragLeave={() => {
                      const updatedFolders = [...folders];
                      updatedFolders[index].isHovered = false;
                      setFolders(updatedFolders);
                    }}
                    style={{padding:"10px"}}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "start",
                        flexDirection: "column",
                        position: "relative",
                      }}
                    >
                      {
                        <span
                          style={{
                            position: "absolute",
                            background: "#ccc",
                            top: 0,
                            left: 0,
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            color: "#000",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "12px",
                          }}
                        >
                          {folder.images.length}
                        </span>
                      }
                      <FcOpenedFolder
                        size={folder.isHovered?100:50}
                        style={{
                          cursor: "pointer",
                          color: "green",
                          
                        }}
                      />
                      <span
                        style={{ color: folder.isHovered ? "red" : "black" }}
                      >
                        {folder.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      }
    </div>
  );
}

export default App;
