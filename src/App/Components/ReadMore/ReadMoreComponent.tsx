import useFirstEffect from '@App/Libs/useFirstEffect';
import { GetNonce } from '@App/Libs/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { scroller } from 'react-scroll';

import A from '../AComponent';
import DeviceDetectionContext, { DeviceDetectionContextModel } from '../DeviceDetection/DeviceDetectionContext';
import LayoutContext, { LayoutContextModel } from '../LayoutContext';
import ReadMoreComponentStyles from './styles.scss';

export interface ReadMoreComponentProps {
  children: any;
  height?: number;
  showMoreText?: string;
  showLessText?: string;
}

const ReadMoreComponent = (props: ReadMoreComponentProps) => {
  const { translate }: LayoutContextModel = useContext(LayoutContext);
  const { isMobile }: DeviceDetectionContextModel = useContext(DeviceDetectionContext);
  const { children, height = 100, showLessText = translate('showLess'), showMoreText = translate('showMore') } = props;
  const [showReadMoreSection, setShowReadMoreSection] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const contentRef = useRef(null);
  const nonce = GetNonce();

  useEffect(() => {
    if (contentRef.current.offsetHeight > height) {
      setShowReadMoreSection(true);
    }
    return () => {};
  }, []);

  useFirstEffect(() => {
    if (showMoreBtn) {
      scroller.scrollTo(`readMoreWrapper_${nonce}`, {
        spy: true,
        hashSpy: false,
        smooth: true,
        duration: 500,
        isDynamic: true,
        offset: isMobile ? -100 : -270,
      });
    }
  }, [showMoreBtn]);

  return (
    <>
      <div
        id={`readMoreWrapper_${nonce}`}
        ref={contentRef}
        className={
          showReadMoreSection
            ? `${showMoreBtn ? `${ReadMoreComponentStyles.readLess}` : `${ReadMoreComponentStyles.readMore}`}`
            : ''
        }
        style={{
          height: showReadMoreSection ? height : 'auto',
        }}
      >
        {children}
      </div>
      {showReadMoreSection && (
        <div className={ReadMoreComponentStyles.btnReadMoreWrapper}>
          <A
            className={`${ReadMoreComponentStyles.btnReadMore} btn btn-light btn-sm`}
            onClickEvent={() => {
              setShowMoreBtn(!showMoreBtn);
            }}
          >
            {showMoreBtn ? showMoreText : showLessText}&nbsp;
            <FontAwesomeIcon icon={showMoreBtn ? 'angle-down' : 'angle-up'} />
          </A>
        </div>
      )}
    </>
  );
};

export default ReadMoreComponent;
