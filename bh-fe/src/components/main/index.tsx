import { Wrap } from "src/styles/Container";
import Banner from "./Banner";
import MainInformation from "./MainInformation";

function MainComponent() {
  return (
    <Wrap>
      <Banner />
      <MainInformation />
    </Wrap>
  );
}

export default MainComponent;
