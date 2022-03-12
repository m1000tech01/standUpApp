import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import {
  getMaterialFolderIcon,
  getMaterialFileIcon,
} from "file-extension-icon-js";
import rightArrow from "../../images/right-arrow.png";
import downArrow from "../../images/down-arrow.png";

export default function FileTree(props) {
  const treeData = props.data;
  const treeAction = props.action;
  const treeDecorator = props.decorator;
  const collapseAll =
    treeData.id > 1 && props.collapseAll
      ? props.collapseAll.collapseAll
      : false;

  const [isToggled, setIsToggled] = useState(
    treeData.toggled === undefined ? false : treeData.toggled
  );

  if (collapseAll && isToggled) setIsToggled(false);

  const handleOnClick = () => {
    if (props.collapseAll) props.collapseAll.handleCollapseAll(false);
    if (treeData.child.length) setIsToggled(!isToggled);
    else if (treeAction && treeAction.fileOnClick)
      treeAction.fileOnClick(treeData);
  };

  const handleOnClickFolder =(name)=>{
      console.log("Folder!" + name);
      
  }

  const treeIcon = (name, type) => {
    //type: 0 - file, 1 - folder, 2 - open folder
    let iconSrc = "";
    let iconAlt = "";
    let icon="";
    switch (type) {
      case 0:
        iconSrc = getMaterialFileIcon(name);
        iconAlt = "file-" + name;
        icon=<img src={iconSrc} alt={iconAlt} width={treeDecorator.iconSize} />

        break;
      case 1:
        iconSrc = getMaterialFolderIcon(name);
        iconAlt = "folder-" + name;
        icon= <img src={iconSrc} alt={iconAlt} width={treeDecorator.iconSize}  onClick={() => handleOnClickFolder(name)}/>
        break;
      case 2:
        iconSrc = getMaterialFolderIcon(name, 1);
        iconAlt = "folder-" + name;
        icon= <img src={iconSrc} alt={iconAlt} width={treeDecorator.iconSize}  onClick={() => handleOnClickFolder(name)}/>
        break;

      default:
        break;
    }


    return <span className="mx-1">{icon}</span>;
  };

  const isFile=(treeData )=>
  {
      if (treeData.isfolder)
        return true;
      else
        return false;
  }


  const treeName = (
    <div onClick={() => handleOnClick()} role="button">
      {treeData.child.length && !isToggled ? (
        <span>
          <img src={rightArrow} alt="" width="8" />
            {treeIcon(treeData.name, 1)}
        </span>
      ) : treeData.child.length ? (
        <span>
          <img src={downArrow} alt="" width="8" />
          {treeIcon(treeData.name, 2)}
        </span>
      ) : (
        <span style={{ marginLeft: "8px" }}>
          {treeIcon(treeData.name, 0)}
        </span>
      )}
      {isFile(treeData)===false?   <span
        className="mx-1"
        style={treeDecorator && { fontSize: treeDecorator.textSize }}
      >
        {treeData.name}
      </span>:   <span
        className="mx-1"
        style={treeDecorator && { fontSize: treeDecorator.textSize }}
        onClick={() => handleOnClickFolder(treeData.name)}
      >
        {treeData.name}
      </span>}
   
    </div>
  );

  const treeChild =
    treeData.child.length > 0 &&
    treeData.child.map((item) => (
      <div
        style={
          treeData.id > 1
            ? {
                marginLeft: "8px",
                marginRight: "8px",
                marginTop: "6px",
                marginBottom: "6px",
              }
            : {}
        }
        key={item.id}
      >
        <FileTree
          data={item}
          action={treeAction}
          collapseAll={props.collapseAll}
          decorator={treeDecorator}
        />
      </div>
    ));

  return (
    <div className="tree" id={"tree" + treeData.id}>
      {treeData.id > 1 && <div className="tyyyreeName">{treeName}</div>}
      <Collapse in={isToggled && !collapseAll} >
        <div className="treeChild" id={"tree-" + treeData.id + "-child"}>
          {treeChild}
        </div>
      </Collapse>
    </div>
  );
};
