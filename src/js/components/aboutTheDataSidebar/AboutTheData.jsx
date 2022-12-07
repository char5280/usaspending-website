/**
 * AboutTheData.jsx
 * Created by Nick Torres 11/2/22
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import AboutTheDataHeader from "./AboutTheDataHeader";
import AboutTheDataListView from "./AboutTheDataListView";
import AboutTheDataDrilldown from "./AboutTheDataDrilldown";
import DownloadButton from "./DownloadButton";
import { LoadingWrapper } from "../sharedComponents/Loading";

const propTypes = {
    children: PropTypes.element,
    aboutTheDataSidebar: PropTypes.object,
    schema: PropTypes.object
};

const AboutTheData = (props) => {
    const [height, setHeight] = useState(0);
    const [drilldown, setDrilldown] = useState(null);
    const [drilldownItemId, setDrilldownItemId] = useState(null);
    const [drilldownSection, setDrilldownSection] = useState(null);
    // const [drilldownComponent, setDrilldownComponent] = useState(null);
    const [scrollbar, setScrollbar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // const [slug, setSlug] = useState(null);


    const { schema } = props;

    const measureAvailableHeight = () => {
        const paddingBottom = 200;
        const wrapperHeight = document.getElementById('usa-atd-wrapper')?.getBoundingClientRect().height || 0;
        const headerHeight = document.getElementById('usa-atd-header')?.getBoundingClientRect().height || 0;

        const sidebarHeight = wrapperHeight - headerHeight - paddingBottom;

        setHeight(sidebarHeight);
    };

    useEffect(() => {
        measureAvailableHeight();
        if (scrollbar) {
            scrollbar.scrollToTop();
        }
    }, [drilldown, scrollbar]);

    useEffect(() => {
        if (props.aboutTheDataSidebar.term.slug && props.aboutTheDataSidebar.term.slug !== '') {
            for (let i = 0; i < Object.keys(schema).length; i++) {
                const sectionName = Object.keys(schema)[i];
                for (let j = 0; j < schema[sectionName].fields.length; j++) {
                    if (schema[sectionName].fields[j].slug === props.aboutTheDataSidebar.term.slug) {
                        setDrilldownItemId(j);
                        setDrilldownSection(schema[sectionName]);
                        break;
                    }
                }
            }
        }

        setIsLoading(false);
        window.addEventListener('resize', measureAvailableHeight);
        return () => window.removeEventListener('resize', measureAvailableHeight);
    }, [props?.aboutTheDataSidebar?.term?.slug, schema]);

    const track = () => <div className="atd-scrollbar-track" />;
    const thumb = () => <div className="atd-scrollbar-thumb" />;

    const selectItem = (index, section) => {
        setDrilldownItemId(index);
        setDrilldownSection(section);
    };

    const clearDrilldown = () => {
        setDrilldownItemId(null);
        setDrilldownSection(null);
        setDrilldown(false);
    };

    const closeAboutTheData = () => {
        // close the glossary when the escape key is pressed for accessibility and general
        props.hideAboutTheData();

        // move focus back to the main content
        const mainContent = document.getElementById('main-focus');
        if (mainContent) {
            mainContent.focus();
        }
    };

    useEffect(() => {
        if (drilldownItemId !== null && drilldownItemId >= 0 && drilldownSection) {
            scrollbar?.scrollToTop();
            setDrilldown(true);
        }
    }, [drilldownItemId, drilldownSection, scrollbar]);

    // useEffect(() => {
    //     if (slug?.length > 0) {
    //         console.log(slug);
    //         // lazy load the md files
    //         // const Component = React.lazy(() => import(/* webpackPreload: true */ `../../../content/about-the-data/${slug}.md`).then((comp) => comp));
    //         // setDrilldownComponent(<Component />);
    //     }
    // }, [slug]);

    return (
        <div id="usa-atd-wrapper" className="usa-atd-wrapper">
            <aside
                role="dialog"
                aria-labelledby="atd-title"
                className="atd-sidebar">
                {isLoading ?
                    <><LoadingWrapper isLoading /></>
                    :
                    <>
                        <AboutTheDataHeader closeAboutTheData={closeAboutTheData} />
                        <Scrollbars
                            style={{ height }}
                            renderTrackVertical={track}
                            renderThumbVertical={thumb}
                            ref={(s) => setScrollbar(s)}>
                            {drilldown ?
                                <div className="atd__body">
                                    <AboutTheDataDrilldown
                                        section={drilldownSection.heading}
                                        name={drilldownSection.fields[drilldownItemId].name}
                                        clearDrilldown={clearDrilldown}
                                        slug={drilldownSection.fields[drilldownItemId].slug} />
                                </div>
                                :
                                <>
                                    <div className="atd__body">
                                        <DownloadButton />
                                        <AboutTheDataListView section={schema.descriptions} selectItem={selectItem} />
                                        <AboutTheDataListView section={schema.disclosures} selectItem={selectItem} />
                                        <AboutTheDataListView section={schema["award-disclosures"]} selectItem={selectItem} />
                                        <AboutTheDataListView section={schema["covid-disclosures"]} selectItem={selectItem} />
                                    </div>
                                </>}
                        </Scrollbars>
                    </>
                }
            </aside>
        </div>);
};

AboutTheData.propTypes = propTypes;
export default AboutTheData;
