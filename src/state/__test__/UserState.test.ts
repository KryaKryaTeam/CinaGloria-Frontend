import { describe, expect, it, beforeEach } from "vitest";
import User from "../../core/domain/entity/User";
import Email from "../../core/domain/value-object/Email";
import Username from "../../core/domain/value-object/Username";
import AvatarURL from "../../core/domain/value-object/AvatarURL";
import { UserState } from "../UserState";
import { AdditionData } from "@/core/requests/network/PutAdditionData.request";
describe("UserState", () => {
  let userState: UserState;

  // Helper to create a valid User instance
  const createMockUser = () => {
    return User.create(
      "user-123",
      Email.create("test@example.com"),
      Username.create("ValidUsername"),
      AvatarURL.create("https://avatar.com")
    );
  };

  beforeEach(() => {
    userState = new UserState();
  });

  describe("Authentication", () => {
    it("should update authorization state when token is set", () => {
      userState.setAuthToken("jwt-token");
      expect(userState.authToken).toBe("jwt-token");
      expect(userState.isAuthorized).toBe(true);
    });

    it("should reset state when token is cleared", () => {
      userState.setAuthToken("jwt-token");
      userState.clearAuthToken();
      expect(userState.authToken).toBe("");
      expect(userState.isAuthorized).toBe(false);
    });
  });

  describe("User Management", () => {
    it("should store the user entity", () => {
      const user = createMockUser();
      userState.setUser(user);
      expect(userState.User).toBe(user);
    });

    it("should clear user data", () => {
      userState.setUser(createMockUser());
      userState.clearUserData();
      expect(userState.User).toBeNull();
    });

    it("should update user entity internals via changeUserData", () => {
      const user = createMockUser();
      
      // Initialize optional fields for the test since User.create sets them to null
      // and changeUserData requires them to exist to update them in your current code
      // Note: In your User class, updateAge and updateFullName only run if this._age/this._fullName exist
      user['_age'] = { value: 0, birthDay: new Date() };
      user['_fullName'] = { value: "", firstName: "", lastName: "", surName: "" };
      
      userState.setUser(user);

      const data: AdditionData = {
        telegram: "@dev_user",
        discord: "dev#0001",
        birthDay: new Date("1995-05-05"),
        firstName: "John",
        lastName: "Doe",
        surName: "Smith"
      };

      userState.changeUserData(data);

      expect(user.contacts.telegram).toBe("@dev_user");
      expect(user.contacts.discord).toBe("dev#0001");
      expect(user.fullName?.firstName).toBe("John");
      expect(user.age?.birthDay).toEqual(new Date("1995-05-05"));
    });
  });
});
