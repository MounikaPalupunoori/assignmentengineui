import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import DefaultGroupImage from '../../../assets/ae_group.png';
import PropTypes from "prop-types";
import { Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { doGetUsersCountByGroupId } from "../actions/action";
import { useNavigate } from "react-router-dom";

GroupCard.propTypes = {
  group: PropTypes.object.isRequired
};

export default function GroupCard(props) {

  const { group } = props;
  const navigate = useNavigate();
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    doGetUsersCountByGroupId(group?.id, handleSuccess, handleFailure);
    // eslint-disable-next-line
  }, []);

  const handleSuccess = (count) => {
    setUsersCount(count);
  };

  const handleFailure = (error) => {
    props.onError(error);
  };  

  const handleGroupCardClick = () => {
    navigate("/console/tenant/group/user", {
        state: {
            group: group
        }
    })
  };

  return (
    <Card sx={{ height: "100%", cursor: "pointer" }}>
      <Grid container sx={{ justifyContent: "space-around" }} onClick={handleGroupCardClick}>
        <Grid item>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">{group?.groupName}</Typography>
            <Typography variant="body2">Users: {usersCount}</Typography>
          </CardContent>
        </Grid>
        <Grid item>
          <CardMedia
            component={'img'}
            alt={group?.groupName}
            image={group?.groupImage ? group.groupImage : DefaultGroupImage}
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

