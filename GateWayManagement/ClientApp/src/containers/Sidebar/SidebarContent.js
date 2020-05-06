import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SidebarContent extends Component {
  getNoHeaderClass = navStyle => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = navStyle => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    const { themeType, navStyle, pathname } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split("/")[1];
    return (
      <Auxiliary>
        <SidebarLogo />
        <div className="gx-sidebar-content">
          <div
            className={`gx-sidebar-notifications ${this.getNoHeaderClass(
              navStyle
            )}`}
          >
            <UserProfile />
            <AppsNavigation />
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
              mode="inline"
            >
              <Menu.Item key="main/dashboard/general">
                <Link to="/main/dashboard/general">
                  <i className="icon icon-crypto" />
                  <IntlMessages id="sidebar.main.general" />
                </Link>
              </Menu.Item>
              <Menu.Item key="main/dashboard/profile">
                <Link to="/main/dashboard/profile">
                  <i className="icon icon-crypto" />
                  <IntlMessages id="sidebar.main.profile" />
                </Link>
              </Menu.Item>
              <Menu.Item key="main/dashboard/order">
                <Link to="/main/dashboard/order">
                  <i className="icon icon-crypto" />
                  <IntlMessages id="sidebar.main.order" />
                </Link>
              </Menu.Item>
              <Menu.Item key="main/dashboard/event">
                <Link to="/main/dashboard/event">
                  <i className="icon icon-crypto" />
                  <IntlMessages id="sidebar.main.event" />
                </Link>
              </Menu.Item>
              <Menu.Item key="main/dashboard/exchange">
                <Link to="/main/dashboard/exchange">
                  <i className="icon icon-crypto" />
                  <IntlMessages id="sidebar.main.exchange" />
                </Link>
              </Menu.Item>
              <Menu.Item key="main/dashboard/promotion">
                <Link to="/main/dashboard/promotion">
                  <i className="icon icon-crypto" />
                  <IntlMessages id="sidebar.main.promotion" />
                </Link>
              </Menu.Item>
              <Menu.Item key="main/dashboard/order-processing">
                <Link to="/main/dashboard/order-processing">
                  <i className="icon icon-crypto" />
                  <IntlMessages id="sidebar.main.processing" />
                </Link>
              </Menu.Item>
            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({ settings }) => {
  const { navStyle, themeType, locale, pathname } = settings;
  return { navStyle, themeType, locale, pathname };
};
export default connect(mapStateToProps)(SidebarContent);
