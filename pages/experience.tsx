import Layout from '@components/Layout/layout';
import Container from '@components/container';
import ExperienceCard from '@components/experience-card';
import { ExperienceCardItems } from '@components/experience-card.data';
import { ExperienceCardProps } from '@components/experience-card.types';
import MetaTags from '@components/meta-tags';
import PageTitle from '@components/page-title';
import {
  CMS_NAME,
  META_EXPERIENCE,
  TITLE_EXPERIENCE,
  TWITTER_CARD_EXPERIENCE,
  TWITTER_HANDLE,
} from '@shared/constants';

const Experience = () => {
  return (
    <>
      <Layout>
        <MetaTags
          ogDescription={META_EXPERIENCE}
          ogImage={TWITTER_CARD_EXPERIENCE}
          ogSiteName={CMS_NAME}
          ogTitle={'Experience'}
          ogTwitterCard='summary_large_image'
          ogTwitterCreator={TWITTER_HANDLE}
          ogTwitterImage={`${TWITTER_CARD_EXPERIENCE}?${Date.now()}`}
          ogTwitterSite={TWITTER_HANDLE}
          ogTwitterTitle={TITLE_EXPERIENCE}
          ogUrl='https://mannuelferreira.com/experience'
        />
        <Container>
          <PageTitle>Experience</PageTitle>
          <div className='pt-4 mt-8 mb-8 border-t'>
            <p className='text-lg'>
              I am grateful to have worked with many incredible people on many awesome products &
              projects over the years.
            </p>
          </div>
          <section className='mb-10 text-center grid-rows-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
            {ExperienceCardItems
              ? ExperienceCardItems.map((experience: ExperienceCardProps) => (
                  <ExperienceCard key={experience.title} {...experience} />
                ))
              : null}
          </section>
        </Container>
      </Layout>
    </>
  );
};

export default Experience;

export const getStaticProps = async () => {
  const data = {};

  return {
    props: { data },
  };
};
