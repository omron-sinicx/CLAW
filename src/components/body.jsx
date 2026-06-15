import React from 'react';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import AdvancedTasks from './advanced-tasks.jsx';

const renderer = new marked.Renderer();
renderer.table = (header, body) => {
  return `<div class="uk-overflow-auto"><table class="uk-table uk-table-small uk-text-small uk-table-divider"> ${header} ${body} </table></div>`;
};

marked.use(markedKatex({ throwOnError: false }));
marked.use({ renderer: renderer });

const SectionHeader = ({ title, titleHtml, text, kicker }) => (
  <div
    className={`claw-section-header ${
      titleHtml ? 'claw-section-header-wide' : ''
    }`}
  >
    {kicker && <div className="claw-kicker">{kicker}</div>}
    {titleHtml ? (
      <h2 dangerouslySetInnerHTML={{ __html: titleHtml }} />
    ) : (
      <h2>{title}</h2>
    )}
    {text && <p>{text}</p>}
  </div>
);

const Figure = ({ src, caption, className = '' }) => (
  <figure className={`claw-figure ${className}`}>
    <img src={src} alt={caption || ''} loading="lazy" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

const VideoTile = ({ video }) =>
  (() => {
    const poster =
      video.poster || `posters/${video.src.replace(/\.[^.]+$/, '.jpg')}`;
    return (
      <article className="claw-media-tile">
        <video
          src={video.src}
          poster={poster}
          controls
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div>
          <h3>{video.title}</h3>
          {video.caption && <p>{video.caption}</p>}
        </div>
      </article>
    );
  })();

const StatGrid = ({ stats }) =>
  stats?.length ? (
    <div className="claw-stat-grid">
      {stats.map((stat) => (
        <div className="claw-stat" key={`${stat.value}-${stat.label}`}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  ) : null;

const SystemSection = ({ section }) => (
  <section className="claw-page-section">
    <SectionHeader
      title={section.title}
      text={section.text}
      kicker={section.kicker}
    />
    <StatGrid stats={section.stats} />
    <Figure src={section.image} caption="CLAW system overview." />
    {section.flow?.length && (
      <div className="claw-flow-grid">
        {section.flow.map((item) => (
          <article className="claw-flow-item" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    )}
  </section>
);

const BomTable = ({ bom }) => (
  <details className="claw-bom">
    <summary>
      <span>Bill of materials</span>
      <strong>{bom.total}</strong>
    </summary>
    <div className="uk-overflow-auto">
      <table className="uk-table uk-table-small uk-table-divider">
        <thead>
          <tr>
            <th>Item</th>
            <th className="uk-text-right">Unit</th>
            <th className="uk-text-right">Qty</th>
            <th className="uk-text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {bom.items.map((item) => (
            <tr key={`${item.item}-${item.total}`}>
              <td>{item.item}</td>
              <td className="uk-text-right">{item.unit}</td>
              <td className="uk-text-right">{item.quantity}</td>
              <td className="uk-text-right">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </details>
);

const SpecTable = ({ specs }) =>
  specs?.length ? (
    <details className="claw-bom claw-spec-table">
      <summary>
        <span>Technical specifications</span>
      </summary>
      <div className="uk-overflow-auto">
        <table className="uk-table uk-table-small uk-table-divider">
          <tbody>
            {specs.map((spec) => (
              <tr key={`${spec.value}-${spec.label}`}>
                <td>{spec.label}</td>
                <td className="uk-text-right">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  ) : null;

const HardwareSection = ({ section }) => (
  <section className="claw-page-section">
    <SectionHeader
      title={section.title}
      titleHtml={section.title_html}
      text={section.text}
    />
    <StatGrid stats={section.stats} />
    <div className="claw-image-grid">
      {section.images?.map((image) => (
        <Figure key={image.src} src={image.src} caption={image.caption} />
      ))}
    </div>
    <div className="claw-details-grid">
      <SpecTable specs={section.specs} />
      {section.bom && <BomTable bom={section.bom} />}
    </div>
  </section>
);

const ResultsSection = ({ section }) => (
  <section className="claw-page-section">
    <SectionHeader title={section.title} text={section.text} />
    <div className="claw-image-grid">
      {section.images?.map((image) => (
        <Figure key={image.src} src={image.src} caption={image.caption} />
      ))}
    </div>
  </section>
);

const VideosSection = ({ section }) => (
  <section
    className={`claw-page-section ${
      section.title === 'CLAW enables more robust policies'
        ? 'claw-three-video-section'
        : ''
    }`}
  >
    <SectionHeader title={section.title} text={section.text} />
    {section.videos?.length && (
      <div className="claw-media-grid">
        {section.videos.map((video) => (
          <VideoTile key={video.src} video={video} />
        ))}
      </div>
    )}
    {section.images?.length && (
      <div className="claw-image-grid claw-image-grid-narrow">
        {section.images.map((image) => (
          <Figure key={image.src} src={image.src} caption={image.caption} />
        ))}
      </div>
    )}
  </section>
);

const TeleoperationSection = ({ section }) => (
  <section className="claw-page-section claw-teleop-section">
    <SectionHeader title={section.title} text={section.text} />
    <div className="claw-teleop-layout">
      {section.images?.map((image) => (
        <Figure key={image.src} src={image.src} caption={image.caption} />
      ))}
    </div>
    <div className="claw-media-grid claw-media-grid-compact">
      {section.videos?.map((video) => (
        <VideoTile key={video.src} video={video} />
      ))}
    </div>
  </section>
);

class Content extends React.Component {
  render() {
    if (this.props.title) {
      return (
        <h2 className="uk-margin-top uk-heading-line uk-text-center">
          {this.props.title}
        </h2>
      );
    }
    if (this.props.text) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: marked.parse(this.props.text) }}
        />
      );
    }
    if (this.props.image) {
      return (
        <img
          src={`${this.props.image}`}
          className="uk-align-center uk-responsive-width"
          alt=""
        />
      );
    }
    return null;
  }
}

export default class Body extends React.Component {
  renderStructuredSection(subsection, idx) {
    const key = `subsection-${idx}`;

    if (subsection.type === 'system') {
      return <SystemSection key={key} section={subsection} />;
    }
    if (subsection.type === 'hardware') {
      return <HardwareSection key={key} section={subsection} />;
    }
    if (subsection.type === 'results') {
      return <ResultsSection key={key} section={subsection} />;
    }
    if (subsection.type === 'videos') {
      return <VideosSection key={key} section={subsection} />;
    }
    if (subsection.type === 'teleoperation') {
      return <TeleoperationSection key={key} section={subsection} />;
    }

    if (
      subsection.title === 'Advanced Manipulation Tasks' &&
      subsection.tasks
    ) {
      return (
        <div key={key}>
          <Content title={subsection.title} />
          <AdvancedTasks tasks={subsection.tasks} />
          {subsection.additionalText && (
            <Content text={subsection.additionalText} />
          )}
        </div>
      );
    }

    return (
      <div key={key}>
        <Content title={subsection.title} />
        <Content image={subsection.image} />
        <Content text={subsection.text} />
      </div>
    );
  }

  render() {
    return this.props.body ? (
      <div className="uk-section claw-body">
        {this.props.body.map((subsection, idx) =>
          this.renderStructuredSection(subsection, idx)
        )}
      </div>
    ) : null;
  }
}
