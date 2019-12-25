import React from "react";
import {Avatar} from "antd";

const ProfileHeader = () => {
  return (
    <div className="gx-profile-banner">
      <div className="gx-profile-container">
        <div className="gx-profile-banner-top">
          <div className="gx-profile-banner-top-left">
            <div className="gx-profile-banner-avatar">
              <Avatar
                className="gx-size-90"
                alt="..."
                src={"https://via.placeholder.com/150x150"}
              />
            </div>
            <div className="gx-profile-banner-avatar-info">
              <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light">
                Nguyễn Tuấn Anh
              </h2>
              <p className="gx-mb-0 gx-fs-lg">Thành viên VIP</p>
            </div>
          </div>
          <div className="gx-profile-banner-top-right">
            <ul className="gx-follower-list">
              <li>
                <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
                  2,000,000 vnd
                </span>
                <span className="gx-fs-sm">Tiền trong ví</span>
              </li>
              <li>
                <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
                  1,000
                </span>
                <span className="gx-fs-sm">GW Point</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
