import Container from '@components/container';
import ExperienceCard from '@components/experience-card';
import Layout from '@components/Layout/layout';
import PageTitle from '@components/page-title';
import { ExperienceCardItems } from '@components/experience-card.data';
import { ExperienceCardProps } from '@components/experience-card.types';
import {
  CMS_NAME,
  GENERIC_META,
  META_EXPERIENCE,
  SITE_URL,
  TWITTER_CARD_POSTS,
  TWITTER_HANDLE,
} from '@shared/constants';
import MetaTags from '@components/meta-tags';

const Experience = () => {
  return (
    <>
      <Layout>
        <MetaTags
          ogTitle={'Experience'}
          ogImage={TWITTER_CARD_POSTS}
          ogDescription={META_EXPERIENCE}
          ogUrl='https://mannuelferreira.com/experience'
          ogSiteName={CMS_NAME}
          ogTwitterCard='summary_large_image'
          ogTwitterSite={TWITTER_HANDLE}
          ogTwitterCreator={TWITTER_HANDLE}
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
