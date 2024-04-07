import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack"; // LOCAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { FlexBetween } from "components/flex-box";
import { H2, Paragraph } from "components/Typography"; // STYLED COMPONENTS

import { StyledButton, ContentWrapper, StyledContainer } from "./styles"; // IMPORT IMAGES

import drone from "../../../../public/assets/images/products/drone-2.png";
import iphone14 from "../../../../public/assets/images/products/iphone-14.png";
import iphone12 from "../../../../public/assets/images/products/iphone-12.png";
import nikonCamera from "../../../../public/assets/images/products/nikon-camera.png";
import appleAirPod from "../../../../public/assets/images/products/apple-airpod.png";
import headphone from "../../../../public/assets/images/products/beat-headphone.png";
import appleWatch from "../../../../public/assets/images/products/apple-watch-4.png";
export default function Section1({
  banner1, banner2, banner3, banner4, banner5, banner6
}) {

  return <StyledContainer>
      <Grid container spacing={3}>
        {
        /* IPHONE 14 PRO */
      }
        {
          !banner1.error ? <Grid item lg={4} sm={6} xs={12}>
          <ContentWrapper>
            <Box padding={4} pb={0}>
              <Paragraph mb={1} fontSize={{
              xl: 20,
              md: 18,
              xs: 16
            }}>
                {banner1._title ? banner1._title : "Iphone 14 Pro"}
              </Paragraph>

              <H2 lineHeight={1.2} mb={2} fontSize={{
              xl: 40,
              md: 32,
              xs: 28
            }}>
                {banner1._subtitle.substring(0, banner1._subtitle.lastIndexOf(' '))} <br />
                {banner1._subtitle.substring(banner1._subtitle.lastIndexOf(' '))}
              </H2>

              <StyledButton>{banner1._redirectText ? banner1._redirectText : "Shop By Category"}</StyledButton>
            </Box>
          <LazyImage width={379} height={340} alt="Apple Watch" src={`data:image/png;base64,${banner1._image}`} style={{
            width: "100%",
            height: "auto",
            display: "block"
          }} />
          </ContentWrapper>
        </Grid> : null
        }

        {
        /* NIKON CAMERA */
      }
        {!banner2.error ? <Grid item lg={4} sm={6} xs={12}>
          <ContentWrapper hasGradient>
          <LazyImage width={379} height={340} alt="Apple Watch" src={`data:image/png;base64,${banner2._image}`} style={{
            width: "100%",
            height: "auto",
            display: "block"
          }} />

            <Box px={4} py={2}>
              <Paragraph mb={1} fontSize={{
              md: 20,
              xs: 18
            }}>
                {banner2._title ? banner2._title : "Iphone 14 Pro"}
              </Paragraph>

              <H2 lineHeight={1.2} mb={2} fontSize={{
              xl: 55,
              md: 42,
              sm: 36,
              xs: 28
            }}>
                {banner2._subtitle.substring(0, banner2._subtitle.lastIndexOf(' '))} <br />
                {banner2._subtitle.substring(banner2._subtitle.lastIndexOf(' '))}
              </H2>

              <StyledButton>Shop By Category</StyledButton>
            </Box>
          </ContentWrapper>
        </Grid> : null}

        {
        /* DJI MINI 3 DRONE */
      }

      {
        !banner3.error ? <Grid item lg={4} sm={6} xs={12}>
        <ContentWrapper>
          <Box padding={4} pb={{
          xl: 6,
          lg: 5,
          md: 3,
          xs: 0
        }}>
            <Paragraph mb={1} fontSize={{
            xl: 20,
            md: 18,
            xs: 16
          }}>
              {banner3._title ? banner3._title : "Iphone 14 Pro"}
            </Paragraph>

            <H2 lineHeight={1.2} mb={2} fontSize={{
            xl: 40,
            md: 32,
            xs: 28
          }}>
              {banner3._subtitle.substring(0, banner3._subtitle.lastIndexOf(' '))} <br />
              {banner3._subtitle.substring(banner3._subtitle.lastIndexOf(' '))}
            </H2>

            <StyledButton>{banner3._redirectText ? banner3._redirectText : "Shop By Category"}</StyledButton>
          </Box>

          <LazyImage width={379} height={340} alt="Apple Watch" src={`data:image/png;base64,${banner3._image}`} style={{
          width: "100%",
          height: "auto",
          display: "block"
        }} />
        </ContentWrapper>
      </Grid> : null
      }


        

        {
        /* APPLE AIR POD PRO 2 */
      }
        {!banner4.error ? <Grid item lg={4} sm={6} xs={12}>
          <ContentWrapper sx={{
          bgcolor: "grey.700"
        }}>
            <Box padding={4} pb={2}>
              <Paragraph mb={1} fontSize={{
              xl: 20,
              md: 18,
              xs: 16
            }}>
                {banner4._title ? banner4._title : "Iphone 14 Pro"}
              </Paragraph>

              <H2 mb={2} lineHeight={1.2} fontSize={{
              xl: 45,
              md: 32,
              xs: 28
            }}>
                {banner4._subtitle.substring(0, banner4._subtitle.lastIndexOf(' '))} <br />
              {banner4._subtitle.substring(banner4._subtitle.lastIndexOf(' '))}
              </H2>

              <StyledButton>{banner4._redirectText ? banner4._redirectText : "Shop By Category"}</StyledButton>
            </Box>

            <Box px={8}>
            <LazyImage width={379} height={340} alt="Apple Watch" src={`data:image/png;base64,${banner4._image}`} style={{
          width: "100%",
          height: "auto",
          display: "block"
        }} />
            </Box>
          </ContentWrapper>
        </Grid> : null}

        {
        /* BEATS & APPLE  */
      }
        {!banner5.error ? <Grid item lg={5} md={7} xs={12}>
          <Stack height="100%" direction="column" spacing={3}>
            <FlexBetween height="100%" borderRadius={3} bgcolor="grey.300" position="relative">
              <Box padding={4} position="relative" zIndex={1}>
                <Paragraph mb={1} fontSize={{
                xl: 20,
                md: 18,
                xs: 16
              }}>
                  {banner5._title ? banner5._title : "Iphone 14 Pro"}
                </Paragraph>

                <H2 lineHeight={1.2} mb={2} fontSize={{
                xl: 35,
                md: 32,
                xs: 28
              }}>
                   {banner5._subtitle.substring(0, banner5._subtitle.lastIndexOf(' '))} <br />
              {banner5._subtitle.substring(banner5._subtitle.lastIndexOf(' '))}
                </H2>

                <StyledButton isWhite>{banner6._redirectText ? banner6._redirectText : "Shop By Category"}</StyledButton>
              </Box>

              <Box right={0} maxHeight="100%" position="absolute" maxWidth={{
              md: 450,
              xs: 350
            }}>
                 <LazyImage width={379} height={340} alt="Apple Watch" src={`data:image/png;base64,${banner5._image}`} style={{
          width: "100%",
          height: "auto",
          display: "block"
        }} />
              </Box>
            </FlexBetween>

            <ContentWrapper sx={{
            bgcolor: "primary.main",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            display: "flex"
          }}>
              NCT Adsense
            </ContentWrapper>
          </Stack>
        </Grid> : null}

        {
        /* IPHONE 12 FOR YOU */
      }
        {!banner6.error ? <Grid item lg={3} md={5} xs={12}>
          <ContentWrapper sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
            <Box padding={4} pb={0}>
              <Paragraph mb={1} fontSize={{
              xl: 20,
              md: 18,
              xs: 16
            }}>
                {banner6._title ? banner6._title : "Iphone 14 Pro"}
              </Paragraph>

              <H2 lineHeight={1.2} mb={2} fontSize={{
              xl: 35,
              md: 32,
              xs: 28
            }}>
                {banner6._subtitle.substring(0, banner6._subtitle.lastIndexOf(' '))} <br />
              {banner6._subtitle.substring(banner6._subtitle.lastIndexOf(' '))}
              </H2>

              <StyledButton>{banner6._redirectText}</StyledButton>
            </Box>

            <LazyImage width={379} height={340} alt="Apple Watch" src={`data:image/png;base64,${banner4._image}`} style={{
          width: "100%",
          height: "auto",
          display: "block"
        }} />
          </ContentWrapper>
        </Grid> : null }
      </Grid>
    </StyledContainer>;
}