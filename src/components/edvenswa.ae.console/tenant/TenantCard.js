import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import DefaultTenantImage from '../../../assets/ae_tenant.png';
import PropTypes from "prop-types";
import { Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { doGetGroupsCountByTenantId } from "../actions/action";
import { useNavigate } from "react-router-dom";

TenantCard.propTypes = {
  tenant: PropTypes.object.isRequired
};

export default function TenantCard(props) {

  const { tenant } = props;
  const navigate = useNavigate();
  const [groupCount, setGroupCount] = useState(0);

  useEffect(() => {
    doGetGroupsCountByTenantId(tenant?.id, handleSuccess, handleFailure);
    // eslint-disable-next-line
  }, []);

  const handleSuccess = (count) => {
    setGroupCount(count);
  };

  const handleFailure = (error) => {
    props.onError(error);
  };

  const handleCardClick = (event) => {
    event.preventDefault();
    navigate('/console/tenant/group', {
      state: { tenant: tenant }
    });
  };

  return (
    <Card sx={{ height: "100%", cursor: "pointer" }} onClick={handleCardClick}>
      <Grid container sx={{ justifyContent: "space-around" }}>
        <Grid item>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">{tenant?.tenantName}</Typography>
            <Typography variant="body2">Groups: {groupCount}</Typography>
          </CardContent>
        </Grid>
        <Grid item>
          <CardMedia
            component={'img'}
            alt={tenant?.tenantName}
            image={tenant.tenantImage ? tenant.tenantImage : DefaultTenantImage}
            sx={{ objectFit: "contain", height: "100px", margin: "0.15rem" }}
          />
        </Grid>
        <Grid item xs={12}>
          {
            props?.hasDeletePermission
              ? <Delete fontSize="small" sx={{ color: "#911919" }} />
              : <></>
          }
        </Grid>
      </Grid>
    </Card>
  );
}

