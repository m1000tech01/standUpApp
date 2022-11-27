import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "@mui/icons-material/Label";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import NotesService from "../../services/NotesService";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

const fileTreeData = [
  {
    id: 1,
    label: "Standup",
    isFolder: true,
    subCatergories: [{ id: 8, label: "November Idea", isFolder: false }],
  },
  {
    id: 2,
    label: "Story",
    isFolder: true,
    subCatergories: [{ id: 9, label: "December Idea", isFolder: false }],
  },
  {
    id: 3,
    label: "Theatre Show",
    isFolder: true,
    subCatergories: [{ id: 10, label: "Feb Idea", isFolder: false }],
  },
  {
    id: 4,
    label: "Clown Show",
    isFolder: true,
    subCatergories: [
      { id: 11, label: "2021 Idea", isFolder: false },
      { id: 12, label: "2019 Idea", isFolder: false },
    ],
  },
  {
    id: 5,
    label: "Absurd Show",
    isFolder: true,
    subCatergories: [{ id: 13, label: "Aug Idea", isFolder: false }],
  },
  {
    id: 6,
    label: "Stand Up Show",
    isFolder: true,
    subCatergories: [{ id: 14, label: "June Idea", isFolder: false }],
  },
  {
    id: 7,
    label: "Musical Idea",
    isFolder: false,
  },
];

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  const mapFileTreeview = (data) => {
    data = data.child;
    for (let i = 0; i < data.length; i++) {}
  };

  useEffect(() => {
    async function getFileTreeview() {
      let response = await NotesService.getNoteTreeViewStructure();
      let mapData = mapFileTreeview(response);
    }
    getFileTreeview();
  }, []);

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

export default function GmailTreeView() {
  const renderFileTree = (nodes) => {
    console.log(nodes);
    return nodes.map((node) => {
      let children = [];
      node.subCatergories.map((child) => {
        children.push(
          <StyledTreeItem
            nodeId={child.id}
            labelText={child.label}
            labelIcon={SupervisorAccountIcon}
            labelInfo="90"
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
        );
      });

      return (
        <StyledTreeItem
          nodeId={node.id}
          labelText={node.label}
          labelIcon={InfoIcon}
          labelInfo=""
          color="#e3742f"
          bgColor="#fcefe3"
        >
          {children}
          {/* {Array.isArray(nodes.subCatergories)
          ? nodes.subCatergories.map((node) => renderFileTree(node))
          : null} */}
        </StyledTreeItem>
      );
    });
    // <StyledTreeItem
    //   nodeId={nodes.id}
    //   labelText={nodes.label}
    //   labelIcon={InfoIcon}
    //   labelInfo={nodes.label}
    //   color="#e3742f"
    //   bgColor="#fcefe3"
    // >
    //   {Array.isArray(nodes.subCatergories)
    //     ? nodes.subCatergories.map((node) => renderFileTree(node))
    //     : null}
    // </StyledTreeItem>
  };

  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {fileTreeData === undefined ? <></> : renderFileTree(fileTreeData)}
      <StyledTreeItem
        nodeId="5"
        labelText="Social"
        labelIcon={SupervisorAccountIcon}
        labelInfo="90"
        color="#1a73e8"
        bgColor="#e8f0fe"
      />
      {/* <StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={MailIcon} />
      <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={DeleteIcon} />
      <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={Label}>
        <StyledTreeItem
          nodeId="5"
          labelText="Social"
          labelIcon={SupervisorAccountIcon}
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="Updates"
          labelIcon={InfoIcon}
          labelInfo="2,294"
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="7"
          labelText="Forums"
          labelIcon={ForumIcon}
          labelInfo="3,566"
          color="#a250f5"
          bgColor="#f3e8fd"
        />
        <StyledTreeItem
          nodeId="8"
          labelText="Promotions"
          labelIcon={LocalOfferIcon}
          labelInfo="733"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="4" labelText="History" labelIcon={Label} /> */}
    </TreeView>
  );
}
