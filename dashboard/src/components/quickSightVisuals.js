import LearnerDetails from "./LearnerDetails";
const IframeVisuals = ({ data }) => {
  return (
    <div className="grid grid-cols-6 gap-2 grid-flow-row-dense  ">
      <div className="col-span-3 gap-2">
        <LearnerDetails learnerId={data} />
      </div>
      <iframe
        className="w-full h-full  gap-2 "
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/195adde3-34b4-47da-afd4-b9388c8379ca/sheets/195adde3-34b4-47da-afd4-b9388c8379ca_f61a5de5-dcb9-4886-b36c-ada9178c7b3c/visuals/195adde3-34b4-47da-afd4-b9388c8379ca_fe663a82-5534-4b12-b11e-dd02ce0d9bf5?directory_alias=diquicksights#p.userId=${data}`}
      ></iframe>
      <iframe
        className="w-full h-full col-span-2 "
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/bbc91b5d-9c57-4ae9-8c29-638f3b446a61/sheets/bbc91b5d-9c57-4ae9-8c29-638f3b446a61_6d48a48d-8d80-4419-a824-e25ea982b38e/visuals/bbc91b5d-9c57-4ae9-8c29-638f3b446a61_961d7319-e8ea-407a-b98a-be20b46e0cc1?directory_alias=diquicksights#p.userId=${data}`}
      ></iframe>
      <iframe
        className="w-full  h-full col-span-3 row-span-4 "
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/72e0c104-bab0-4b5c-b6cc-0c6685c7eb82/sheets/72e0c104-bab0-4b5c-b6cc-0c6685c7eb82_3dac6cc4-2c5b-4b5f-9b21-d240f9e3e0de/visuals/72e0c104-bab0-4b5c-b6cc-0c6685c7eb82_96c355b6-9d60-4772-ae56-4879700aa3ad?directory_alias=diquicksights#p.userId=${data}`}
      />
      <iframe
        className="w-full  h-full"
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/cf173d36-4505-44d0-b82c-69ac99884804/sheets/cf173d36-4505-44d0-b82c-69ac99884804_d9b02ac5-1128-48cf-9411-85f76b02fb5d/visuals/cf173d36-4505-44d0-b82c-69ac99884804_f76f6d3d-8004-4ab2-9ca3-562cdd0ee8af?directory_alias=diquicksights#p.userId=${data}`}
      />
      <iframe
        className="w-full  h-full"
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/cf173d36-4505-44d0-b82c-69ac99884804/sheets/cf173d36-4505-44d0-b82c-69ac99884804_d9b02ac5-1128-48cf-9411-85f76b02fb5d/visuals/cf173d36-4505-44d0-b82c-69ac99884804_3347468f-06d2-470d-907d-fbcb48c6937c?directory_alias=diquicksights#p.userId=${data}`}
      />
      <iframe
        className="w-full  h-full"
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/72c24fab-ff00-426e-85be-30efa0bd8483/sheets/72c24fab-ff00-426e-85be-30efa0bd8483_b2dc917e-d8c1-44c7-ab9e-d849f84352e7/visuals/72c24fab-ff00-426e-85be-30efa0bd8483_70f5c827-3352-40b4-87da-f3a75c2b4592?directory_alias=diquicksights#p.userId=${data}`}
      />

      <iframe
        className="w-full  h-full col-span-3 row-span-2"
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/72c24fab-ff00-426e-85be-30efa0bd8483/sheets/72c24fab-ff00-426e-85be-30efa0bd8483_b2dc917e-d8c1-44c7-ab9e-d849f84352e7/visuals/72c24fab-ff00-426e-85be-30efa0bd8483_01502591-d32a-49c5-86c6-e2bb237f4194?directory_alias=diquicksights#p.userId=${data}`}
      />
    </div>
  );
};
export default IframeVisuals;
