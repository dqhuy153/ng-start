import { Component, ViewChild, TemplateRef } from "@angular/core";
import { EViewType } from "@shared/enums";
import { filter, first, map, shareReplay } from "rxjs/operators";
import { UsersFacadeService } from "../../services/users-facade.service";
import { UsersService } from "../../services/users.service";

@Component({
  selector: "bb-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent {
  @ViewChild("cardTemplate", { static: false }) cardTemplate: TemplateRef<HTMLElement>;
  @ViewChild("listTemplate", { static: false }) listTemplate: TemplateRef<HTMLElement>;

  public eViewType = EViewType;
  public mode: EViewType = EViewType.GRID;
  public users$ = this.usersFacadeService.getUsers();
  public usersFilter$ = this.users$;
  public users2$ = this.usersService.getUsers();

  constructor(public usersFacadeService: UsersFacadeService, public usersService: UsersService) {}

  public onViewChage(type: EViewType) {
    this.mode = type;
  }

  public get template() {
    return this.mode === EViewType.GRID ? this.cardTemplate : this.listTemplate;
  }

  search(term: string) {
    this.usersFilter$ = this.users$.pipe(
      map((users) =>
        !term ? users : users.filter((x) => x.name.trim().toLowerCase().includes(term.trim().toLowerCase())),
      ),
    );
  }
}
