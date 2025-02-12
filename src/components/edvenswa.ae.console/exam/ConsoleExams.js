import Exams from "../../edvenswa.ae.exam/Exams";

const ConsoleExams = (props) => {
  return(
    <Exams 
      hasAdminAccess = {true}       
      onError={props.onError} 
      onLoading={props.onLoading}>      
    </Exams>
  );
}
export default ConsoleExams;
