import CohortDetails from "./CohortDetails";
const CohortVisuals = ({ data }) => {
  return (
    <div className="grid  grid-cols-2 md:grid-cols-4   gap-4 ">
      <div className="col-span-2 row-span-2">
        <CohortDetails cohortId={data} />
      </div>
      <iframe
        className="w-full h-full"
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/195adde3-34b4-47da-afd4-b9388c8379ca/sheets/195adde3-34b4-47da-afd4-b9388c8379ca_f61a5de5-dcb9-4886-b36c-ada9178c7b3c/visuals/195adde3-34b4-47da-afd4-b9388c8379ca_fe663a82-5534-4b12-b11e-dd02ce0d9bf5?directory_alias=diquicksights#p.cohortId=${data}`}
      ></iframe>
      <iframe
        className="w-full h-full"
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/52a7a24f-be8b-41d2-9951-3bf71a2302af/sheets/52a7a24f-be8b-41d2-9951-3bf71a2302af_37d8c936-0396-496c-a1cb-cb2ca0d66481/visuals/52a7a24f-be8b-41d2-9951-3bf71a2302af_9ecb7eff-1732-44ee-9459-ccb6d2ed4178?directory_alias=diquicksights#p.cohortId=${data}`}
      ></iframe>
      <iframe
        className="w-full  h-full  "
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/271f618d-0052-4ae3-bf8d-20ec43230ef9/sheets/271f618d-0052-4ae3-bf8d-20ec43230ef9_78af06e0-f59e-46a7-88b0-288230e86267/visuals/271f618d-0052-4ae3-bf8d-20ec43230ef9_e00887bb-c312-47db-80a8-12fb3c6ca959?directory_alias=diquicksights#p.cohortId=${data}`}
      />
      <iframe
        className="w-full  h-full "
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/1718d7d3-2c64-47fb-856b-f0dde0dc0596/sheets/1718d7d3-2c64-47fb-856b-f0dde0dc0596_34f850b6-9cf4-4bde-8e91-7603e57f89da/visuals/1718d7d3-2c64-47fb-856b-f0dde0dc0596_018a579c-56fd-4370-bd77-942eb70d4c3f?directory_alias=diquicksights#p.cohortId=${data}`}
      />
    </div>
  );
};
export default CohortVisuals;
