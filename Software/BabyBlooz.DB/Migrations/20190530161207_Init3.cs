using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BabyBlooz.DB.Migrations
{
    public partial class Init3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lilypads",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    QRCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lilypads", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reports",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    TemperatureMSG = table.Column<string>(nullable: true),
                    MovementMSG = table.Column<string>(nullable: true),
                    HeartbeatMSG = table.Column<string>(nullable: true),
                    SoundMSG = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reports", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    NotificationsEnabled = table.Column<bool>(nullable: false),
                    ReportDataInterval = table.Column<ushort>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Wifis",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    SSID = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    LilypadId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wifis", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Wifis_Lilypads_LilypadId",
                        column: x => x.LilypadId,
                        principalTable: "Lilypads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Datas",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    RecordedAt = table.Column<DateTime>(nullable: false),
                    Temperature = table.Column<double>(nullable: false),
                    Movement = table.Column<double>(nullable: false),
                    Heartbeat = table.Column<double>(nullable: false),
                    Sound = table.Column<double>(nullable: false),
                    LilypadId = table.Column<string>(nullable: true),
                    ReportId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Datas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Datas_Lilypads_LilypadId",
                        column: x => x.LilypadId,
                        principalTable: "Lilypads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Datas_Reports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "Reports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LilypadUser",
                columns: table => new
                {
                    LilypadId = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LilypadUser", x => new { x.LilypadId, x.UserId });
                    table.ForeignKey(
                        name: "FK_LilypadUser_Lilypads_LilypadId",
                        column: x => x.LilypadId,
                        principalTable: "Lilypads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LilypadUser_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Datas_LilypadId",
                table: "Datas",
                column: "LilypadId");

            migrationBuilder.CreateIndex(
                name: "IX_Datas_ReportId",
                table: "Datas",
                column: "ReportId");

            migrationBuilder.CreateIndex(
                name: "IX_LilypadUser_UserId",
                table: "LilypadUser",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Wifis_LilypadId",
                table: "Wifis",
                column: "LilypadId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Datas");

            migrationBuilder.DropTable(
                name: "LilypadUser");

            migrationBuilder.DropTable(
                name: "Wifis");

            migrationBuilder.DropTable(
                name: "Reports");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Lilypads");
        }
    }
}
