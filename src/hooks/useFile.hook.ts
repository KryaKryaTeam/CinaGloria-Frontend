import container, { TYPES } from "@/core/Container";
import { RelationSlotValues } from "@/core/requests/network/File/FileTypes";
import GetFileURLRequest from "@/core/requests/network/File/GetImageURl.request";
import LoadFileRequest from "@/core/requests/network/File/LoadFile.request";
import FileStore from "@/state/FileStore";
import { LoadFileResponse } from "@/core/requests/network/File/LoadFile.request";

const useFile = () => {
  const getRequest = container.get<GetFileURLRequest>(TYPES.GetFileURLRequest);
  const loadRequest = container.get<LoadFileRequest>(TYPES.LoadFileRequest);
  const store = container.get<FileStore>(TYPES.FileStore);

  return {
    load: async (
      data: FormData,
      relation: RelationSlotValues,
    ): Promise<LoadFileResponse> => {
      const loadedData = await loadRequest.execute({
        file: data,
        relationString: relation,
      });
      return loadedData;
    },
  };
};

export default useFile;
