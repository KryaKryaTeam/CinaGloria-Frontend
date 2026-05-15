import Round, { IRoundDTO } from "@/core/domain/entity/Round";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";
import { TYPES } from "@/core/Container.types";
import { inject } from "inversify";
import { UserState } from "@/state/UserState";
import URLEnum from "../../URLEnum";
import { Icons } from "@/core/domain/entity/type";
import Task, { ITaskDTO } from "@/core/domain/entity/Task";

export interface ICreateTask {
  name: string;
  description: string;
  color: string;
  roundId: string;
}

export class CreateTaskRequest extends NetworkRequest<
  ICreateTask,
  Task,
  ITaskDTO
> {
  authorized: boolean = true;
  method: HTTPMethod = "POST";
  mockOutputData: ITaskDTO | undefined;
  protected showProgressInToast: boolean = true;
  protected toastConfig: { loading: string; success: string; error: string } = {
    error: "Failed to create task",
    loading: "Loading...",
    success: "Task created",
  };
  withCSRF: boolean = false;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: ICreateTask): ISubRequestData {
    return {
      url: new URL(URLEnum.TASK_CREATE),
      init: {
        body: JSON.stringify({
          ...data,
        }),
      },
    };
  }
  onSuccess(data: ITaskDTO): Task {
    return new Task(data);
  }
}
