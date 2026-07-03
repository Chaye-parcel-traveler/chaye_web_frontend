import styled from 'styled-components';
import ReportButton from './ReportButton';

const HeadlineNews = () => {
  return (
    <DivContainer className="container">
      <h2 className="txtLeft margin-top-36">A la une</h2>
      <div className="box-chaye sansFond margin-top-25 ">
        <div className="section">
          <div className="wide-slider-testimonial-wrap">
            <WST className="wide-slider-testimonial">
              {Array.from({ length: 6 }).map((_, index) => (
                <Item className="item" key={index}>
                  <blockquote className="block-testimonial">
                    <div className="author">
                      <img
                        src="images/img.png"
                        alt="Free template by TemplateUX"
                      />
                      <div className="txt-alaune">
                        <div>
                          <span> Destination</span>..............
                          <span className="txtViolet">Guyane</span>
                        </div>
                        <div>
                          {' '}
                          <span> Poids disponible</span>........
                          <span className="txtViolet">12kg</span>
                        </div>
                        <div>
                          {' '}
                          <span> Prix</span>
                          ........................................
                          <span className="txtViolet">60€</span>
                        </div>
                      </div>
                    </div>
                    <ReportAction>
                      <ReportButton
                        targetType="announcement"
                        targetId={`headline-${index + 1}`}
                        targetLabel="cette annonce"
                      />
                    </ReportAction>
                  </blockquote>
                </Item>
              ))}
            </WST>
          </div>

          <div className="text-center mb-5 " style={{ paddingTop: '76px' }}>
            <div id="prevnext-testimonial">
              <span className="prev me-3" data-controls="prev">
                <span className="icon-chevron-left"></span>
              </span>
              <span className="next" data-controls="next">
                <span className="icon-chevron-right"></span>
              </span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-4">
              <a className="btnChaye-purple" href="/annonces">
                Voir tous les annonces
              </a>
            </div>
            <div className="col-4">
              <a className="btnChaye-orange" href="#">
                Carte intéractive
              </a>
            </div>
          </div>
        </div>
      </div>
    </DivContainer>
  );
};

const DivContainer = styled.div`
  overflow-x: hidden;
`;

const WST = styled.div`
  scroll-snap-type: mandatory;
  scroll-padding: 0 24px;
  overflow-x: scroll;
  animation: scroll 30s linear infinite;

  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for other browsers */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Item = styled.div`
  scroll-snap-align: start;
`;

const ReportAction = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
`;

export default HeadlineNews;
