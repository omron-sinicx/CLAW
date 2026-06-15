import React from 'react';
import { render } from 'react-dom';
import Authors from '../components/authors.jsx';
import CorporateLogo from '../components/logo.jsx';
import { FaGithub, FaYoutube, FaMedium, FaRegFilePdf } from 'react-icons/fa6';
import { FaFilePdf } from 'react-icons/fa';
import { SiArxiv } from 'react-icons/si';
import { Icon } from '@iconify/react';

const HuggingFace = ({ size }) => (
  <Icon icon="logos:hugging-face-icon" style={{ fontSize: size }} />
);

const GoogleColab = ({ size }) => (
  <Icon icon="simple-icons:googlecolab" style={{ fontSize: size }} />
);

class ResourceBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: typeof window !== 'undefined' ? window.innerWidth < 600 : false,
    };
    this.icons = {
      paper: FaFilePdf,
      arxiv: SiArxiv,
      poster: FaRegFilePdf,
      code: FaGithub,
      video: FaYoutube,
      blog: FaMedium,
      demo: GoogleColab,
      huggingface: HuggingFace,
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  }
  handleResize() {
    if (typeof window !== 'undefined') {
      this.setState({ isMobile: window.innerWidth < 600 });
    }
  }
  render() {
    const sClass = 'uk-margin-small-left uk-text-bold';
    const FaIcon = this.icons[this.props.title];
    const iTitle =
      this.props.title == 'huggingface' && this.state.isMobile
        ? ' hf '
        : this.props.title;
    const content = (
      <>
        <FaIcon size="1.45em" />
        <span className={sClass} style={{ fontFamily: 'Poppins' }}>
          {iTitle}
        </span>
      </>
    );

    if (!this.props.url) {
      return (
        <span className="claw-resource-button claw-resource-button-disabled">
          {content}
        </span>
      );
    }

    return (
      <a
        className="claw-resource-button"
        href={this.props.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile:
        typeof window !== 'undefined' ? window.innerWidth < 1000 : false,
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  }
  handleResize() {
    if (typeof window !== 'undefined') {
      this.setState({ isMobile: window.innerWidth < 960 });
    }
  }

  render() {
    const titleClass = `uk-${
      this.props.title.length > 15 ? 'h2' : 'h1'
    } uk-text-primary`;
    const baseStyle = this.props.header?.bg_image
      ? {
          backgroundImage: `url(${this.props.header.bg_image})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left',
          backgroundColor: '#030706',
        }
      : null;
    const backgroundStyle =
      this.state.isMobile || !this.props.header?.bg_curve
        ? null
        : {
            backgroundImage: `url(${this.props.header.bg_curve})`,
            backgroundSize: 'auto 110%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right center',
            margin: '0',
          };
    return (
      <>
        <div
          className="uk-cover-container uk-background-secondary claw-hero"
          style={baseStyle}
        >
          <div style={backgroundStyle}>
            <div className="uk-container uk-container-small uk-section">
              <div className="uk-text-center uk-text-bold">
                <p className={titleClass}>{this.props.title}</p>
                {this.props.conference && (
                  <span
                    className="uk-label uk-label-primary uk-text-center uk-margin-small-bottom claw-conference-label"
                    style={{ fontFamily: 'Poppins' }}
                  >
                    {this.props.conference}
                  </span>
                )}
              </div>
              <Authors
                authors={this.props.authors}
                affiliations={this.props.affiliations}
                meta={this.props.meta}
              />
              <div className="uk-text-center claw-header-logo">
                <a
                  href="https://www.omron.com/sinicx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CorporateLogo
                    size="xxl"
                    inverted={this.props.theme == 'dark' ? true : false}
                  />
                </a>
              </div>
              <div className="claw-resource-row">
                {['paper'].map((key) => (
                  <ResourceBtn
                    url={this.props.resources[key]}
                    title={key}
                    key={'header-' + key}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
