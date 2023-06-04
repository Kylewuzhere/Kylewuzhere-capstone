import LearnerDetails from "./LearnerDetails";
const IframeVisuals = ({ data }) => {
  return (
    <div className="grid grid-cols-6 gap-2 grid-flow-row-dense  ">
      <div className="col-span-3 gap-2">
        <LearnerDetails learnerId={data} />
      </div>
      <iframe
        className="w-full h-full  gap-2 "
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/2e473c8d-320b-468f-bdb1-dca1b9478c7d/sheets/2e473c8d-320b-468f-bdb1-dca1b9478c7d_af514f0a-3519-4929-b540-cba36abb1c22/visuals/2e473c8d-320b-468f-bdb1-dca1b9478c7d_be455211-b274-4c13-bef8-7eb06525e7b4?directory_alias=diquicksights#p.userId=${data}`}
      ></iframe>
      <iframe
        className="w-full h-full col-span-2 "
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/80205ca8-55f3-4fcc-be08-500b3cf898da/sheets/80205ca8-55f3-4fcc-be08-500b3cf898da_845fffbd-b579-4556-bcb6-0ede0eb03537/visuals/80205ca8-55f3-4fcc-be08-500b3cf898da_adaee9c9-d8ad-4c7c-ba7b-2b2fc52c5300?directory_alias=diquicksights#p.userId=${data}`}
      ></iframe>

      <iframe
        className="w-full  h-full col-span-3 row-span-4 "
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/24993a92-0bb3-4e0a-8e28-4064538f5ee3/sheets/24993a92-0bb3-4e0a-8e28-4064538f5ee3_50d891ca-ca91-4503-9c9b-3743ac37e02d/visuals/24993a92-0bb3-4e0a-8e28-4064538f5ee3_e9c08be1-ed82-46a7-b1cd-8690d36924f8?directory_alias=diquicksights#p.userId=${data}`}
      />

      <iframe
        className="w-full  h-full"
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/65962c2b-6f72-4f8a-a732-e2535f624430/sheets/65962c2b-6f72-4f8a-a732-e2535f624430_240fdd4f-654f-456a-8c66-c3080c391e26/visuals/65962c2b-6f72-4f8a-a732-e2535f624430_2f5e3618-e951-42a3-87b8-8e1baa7ad18f?directory_alias=diquicksights#p.userId=${data}`}
      />
      <iframe
        className="w-full  h-full"
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/65962c2b-6f72-4f8a-a732-e2535f624430/sheets/65962c2b-6f72-4f8a-a732-e2535f624430_240fdd4f-654f-456a-8c66-c3080c391e26/visuals/65962c2b-6f72-4f8a-a732-e2535f624430_cac44aa0-0598-46f8-85e6-e34e9a182f5a?directory_alias=diquicksights#p.userId=${data}`}
      />
      <iframe
        className="w-full  h-full"
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/fe95c68b-34bc-423d-9b73-e898e7b755fa/sheets/fe95c68b-34bc-423d-9b73-e898e7b755fa_beef78e7-93c6-4cd7-b05e-fed5178c6d66/visuals/fe95c68b-34bc-423d-9b73-e898e7b755fa_5a03b64f-b21c-4d42-8417-0e6a119946bb?directory_alias=diquicksights#p.userId=${data}`}
      />

      <iframe
        className="w-full  h-full col-span-3 row-span-2"
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/fe95c68b-34bc-423d-9b73-e898e7b755fa/sheets/fe95c68b-34bc-423d-9b73-e898e7b755fa_beef78e7-93c6-4cd7-b05e-fed5178c6d66/visuals/fe95c68b-34bc-423d-9b73-e898e7b755fa_6ca1f822-76c7-41dc-97b0-643589df59cf?directory_alias=diquicksights#p.userId=${data}`}
      />
    </div>
  );
};
export default IframeVisuals;
