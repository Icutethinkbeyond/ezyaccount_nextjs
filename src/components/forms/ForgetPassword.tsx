import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link  from 'next/link';

import CustomTextField from '@/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
  }

const AuthForgetPassword = ({ title, subtitle, subtext }: registerType) => (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={3}>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                <CustomTextField id="email" variant="outlined" fullWidth />
            </Stack>
            <Button color="primary" variant="contained" size="large" fullWidth component={Link} href="/authentication/login">
                Forget Password
            </Button>
        </Box>
        {subtitle}
    </>
);

export default AuthForgetPassword;