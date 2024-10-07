import { Box, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import facebook from '@/assets/landing_page/facebook.png'
import instagramIcon from "@/assets/landing_page/instagram.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import linkedIcon from "@/assets/landing_page/linkedin.png";
const Footer = () => {
  return (
    <Box bgcolor="rgb(17,26,34)" py={5}>
      <Container>
        <Stack direction='row' gap={4} justifyContent='center'>
          <Typography color='#fff' component={Link} href='/consaltation'>Consaltation</Typography>
          <Typography color='#fff' component={Link} href='/health-plans'>Health Plans</Typography>
          <Typography color='#fff' component={Link} href='/medicine'>Medicine</Typography>
          <Typography color='#fff' component={Link} href='/diagnostics'>Diagnostics</Typography>
          <Typography color='#fff' component={Link} href='/ngos'>NGOs</Typography>
        </Stack>
        <Stack direction='row' gap={4} justifyContent='center' p={3}>
          <Image src={facebook} alt='facebook' width={30} height={30} />
          <Image src={instagramIcon} alt='facebook' width={30} height={30} />
          <Image src={twitterIcon} alt='facebook' width={30} height={30} />
          <Image src={linkedIcon} alt='facebook' width={30} height={30} />\
          {/* <div className="border-b-[1px] border-dashed"></div> */}
         
          </Stack>
          <Box sx={{border:'1px dashed lightgray'}}></Box>
          <Stack
            direction="row"
            gap={2}
            justifyContent="space-between"
            alignItems="center"
            py={3}
          >
            <Typography component="p" color="white">
              &copy;2024 Ph HealthCare. All Rights Reserved.
            </Typography>
            <Typography
              variant="h4"
              component={Link}
              href="/"
              fontWeight={600}
              color="white"
            >
              P
              <Box component="span" color="primary.main">
                H
              </Box>{" "}
              Health Care
            </Typography>
            <Typography component="p" color="white">
              Privacy Policy! Terms & Conditions
            </Typography>
            </Stack>
          
      </Container>
    </Box>
  )
}

export default Footer
