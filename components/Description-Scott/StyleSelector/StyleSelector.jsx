import React, { useState, useEffect } from 'react';
import { useTracking } from 'react-tracking';
import PropTypes from 'prop-types';
// eslint-disable-next-line object-curly-newline
import { Container, Row, Col, Image } from 'react-bootstrap';
import styleSheet from './StyleSelector.module.css';

const StyleSelector = ({ allStyles, styleInfo, setStyleInfo }) => {
  const { trackEvent } = useTracking({ module: 'Product Overview' });

  const [styles, setStyles] = useState([]);

  const handleClick = (styleId) => {
    setStyleInfo(allStyles.find((style) => style.style_id === styleId));
  };

  const groupByFours = () => {
    const styleGroups = [];
    let styleIndex = 0;
    while (styleIndex < allStyles.length) {
      const currentRow = [];

      for (let i = 0; i < 4; i += 1) {
        currentRow.push(allStyles[styleIndex]);
        styleIndex += 1;
        if (styleIndex === allStyles.length) {
          break;
        }
      }
      styleGroups.push(currentRow);
    }

    setStyles(styleGroups);
  };

  useEffect(() => {
    groupByFours();
  }, [allStyles]);

  return (
    <div>
      <Container
        onClick={() => {
          trackEvent({ element: 'Style Selector', time: new Date() });
        }}
        onKeyUp={() => {
          trackEvent({ element: 'Style Selector', time: new Date() });
        }}
      >
        <h5>
          Style &gt;
          {`${styleInfo.name}`}
        </h5>
        {styles.length > 0 ? styles.map((group, j) => (
          <Row key={j}>
            <Col>
              {group.length > 0 ? group.map((style, i) => (
                <span key={style.style_id}>
                  {style.photos[0].thumbnail_url
                    ? (
                      <>
                        <Image
                          className={styleSheet.selectedThumbnail}
                          onClick={() => handleClick(style.style_id)}
                          key={style.style_id}
                          src={style.photos[0].thumbnail_url}
                          alt="style thumbnail"
                          width="80"
                          height="80"
                          style={{ margin: '5px' }}
                          roundedCircle
                        />
                        <Image
                          hidden={!(styleInfo.style_id === style.style_id)}
                          src="/check-mark.png"
                          className={styleSheet.checkmark}
                          fluid
                          roundedCircle
                        />
                      </>
                    )
                    : (
                      < >
                        <Image
                          onClick={() => handleClick(style.style_id)}
                          key={style.style_id}
                          src="/no-image-icon.png"
                          alt="style thumbnail"
                          width="80"
                          height="80"
                          roundedCircle
                        />
                        <span
                          onClick={() => handleClick(i)}
                          onKeyUp={() => handleClick(i)}
                          role="button"
                          tabIndex={0}
                        >
                          {`${style.name}`}
                        </span>
                        <br />
                      </>
                    )}
                </span>
              )) : null}
            </Col>
          </Row>
        )) : null}
      </Container>
    </div>
  );
};

StyleSelector.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  allStyles: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  styleInfo: PropTypes.object.isRequired,
  setStyleInfo: PropTypes.func.isRequired,
};

export default StyleSelector;
