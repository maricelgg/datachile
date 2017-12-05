import React, { Component } from "react";
import { Link } from "react-router";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { SubNav } from "datawheel-canon";

import NavFixed from "components/NavFixed";
import Search from "components/Search";

import { asset_url } from "helpers/url";

import "./Nav.css";

class Nav extends Component {
  state = {
    subnav_visible: false,
    search_visible: false
  };

  toggleSubNav = () => {
    this.setState(prevState => ({
      subnav_visible: !prevState.subnav_visible
    }));
  };

  toggleSearch = () => {
    this.setState(prevState => ({
      search_visible: !prevState.search_visible
    }));
  };

  refSubNav = instance => {
    if (instance) this._nodeSubNav = instance.container;
  };

  manageOutsideClick = evt => {
    const subnav = this._nodeSubNav;
    if (!subnav.isSameNode(evt.target) && !subnav.contains(evt.target))
      this.setState({ subnav_visible: false });
  };

  componentDidMount() {
    document.addEventListener("click", this.manageOutsideClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.manageOutsideClick, true);
  }

  render() {
    const {
      t,
      i18n,
      location,
      title,
      type,
      typeTitle,
      ancestor,
      exploreLink,
      ancestorLink,
      topics
    } = this.props;

    const locale = i18n.locale;
    const otherLang = locale === "es" ? "en" : "es";

    const { subnav_visible, search_visible } = this.state;

    const search_icon = search_visible ? "icon-close" : "icon-search";

    var url = location.href;
    if (!__SERVER__) {
      url = window.location.href;
    }
    url = url.replace(locale, otherLang);

    return (
      <div id="navs-container">
        <nav className="nav">
          <SubNav
            type="scroll"
            anchor="left"
            visible={subnav_visible}
            ref={this.refSubNav}
          >
            <div className="close-btn-container">
              <div className="menu-button">
                <a onClick={this.toggleSubNav}>
                  <img src={asset_url("/images/icons/icon-close.svg")} />
                </a>
              </div>
            </div>
            <ul>
              <li className="title">{t("Navigation")}</li>
              <li className="lang-selector">
                <span className="lang-current">{locale}</span>
                <span> | </span>
                <span className="lang-other">
                  <a href={url}>{otherLang}</a>
                </span>
              </li>
              <li className="link">
                <Link to="/explore/geo">{t("Regions & Comunas")}</Link>
              </li>
              <li className="link">
                <Link to="/explore/countries">{t("Countries")}</Link>
              </li>
              <li className="link">
                <Link to="/explore/institutions">{t("Institutions")}</Link>
              </li>
              <li className="link">
                <Link to="/explore/careers">{t("Careers")}</Link>
              </li>
              <li className="link">
                <Link to="/explore/products">{t("Products")}</Link>
              </li>
              <li className="link">
                <Link to="/explore/industries">{t("Industries")}</Link>
              </li>
              <li className="link">
                <Link to="/explore/map">{t("Map explore")}</Link>
              </li>
              <li className="link">
                <Link to="/about">{t("About")}</Link>
              </li>
              {topics &&
                topics.length > 0 && <li className="title">{t("Topics")}</li>}
            </ul>
          </SubNav>

          <div className="nav-container">
            <div className="l-col">
              <div className="menu-button">
                <a onClick={this.toggleSubNav}>
                  <img src={asset_url("/images/icons/icon-menu.svg")} />
                </a>
              </div>
            </div>

            <div className="c-col">
              <Link className="logo" to="/">
                <img src={asset_url("/images/logos/logo-datachile.png")} />
              </Link>
            </div>

            <div className="r-col">
              <div
                className={`search-nav-container ${
                  search_visible ? "open" : "close"
                }`}
              >
                <div className={`search-nav-wrapper`}>
                  <Search className="search-nav" />
                </div>
                <a className="search-toggle-nav" onClick={this.toggleSearch}>
                  <img src={asset_url(`/images/icons/${search_icon}.svg`)} />
                </a>
              </div>
            </div>
          </div>

          <div className="title-container">
            <div className="nav-title">
              <h1>{title}</h1>
              <div className="meta-title">
                <div className="type">
                  {typeTitle &&
                    exploreLink && (
                      <Link className="link" to={exploreLink}>
                        {type && (
                          <span className="icon-container">
                            <img
                              className="icon"
                              src={asset_url(`/images/icons/icon-${type}.svg`)}
                            />
                          </span>
                        )}
                        <span>{typeTitle}</span>
                      </Link>
                    )}
                  {type && !exploreLink && <span>{typeTitle}</span>}
                </div>
                {ancestor && (
                  <div className="parent">
                    <span className="separator">|</span>
                    <Link className="link" to={ancestorLink}>
                      {ancestor}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        <NavFixed
          topics={topics}
          title={title}
          toggleSubNav={this.toggleSubNav}
        />
      </div>
    );
  }
}

export default translate()(
  connect(
    state => ({
      location: state.location
    }),
    {}
  )(Nav)
);
